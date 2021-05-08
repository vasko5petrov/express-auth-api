import User from '../models/UserSchema';
import HttpException from '../exceptions/HttpException';
import { registerValidation, loginValidation, verifyEmailValidation }  from '../utils/validations/userValidations';
import { logIn, logOut, markAsVerified } from '../auth';
import { sendMail } from '../mail';
import { verifyEmailTemplate } from '../utils/generateEmailTemplates';

// - GET - /getUser?id={i} # returns a user with id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId)

        res.status(200).json({message: 'Success', user});
    } catch (err) {
        next(new HttpException(404, `User was not found`));
    }
};

// - POST - /createUser # creates a user
export const createUser = async (req, res, next) => {
    try {
        const { error } = registerValidation(req.body);

        if (error) return next(new HttpException(400, error.message));

        const emailExist = await User.exists({email: req.body.email});
        if (emailExist) return next(new HttpException(400, 'User with this email already exist'));

        const user = await User.create(req.body);

        const link = user.generateVerificationUrl();

        await sendMail({
            to: req.body.email,
            subject: 'Verify your email address',
            html: verifyEmailTemplate(link)
        });

        logIn(req, user.id);

        res.status(200).json({message: 'Account successfully created'});
    } catch (err) {
        return next(new HttpException(400, err.message));
    }
};

// - POST - /authenticate # auth a user
export const authenticate = async (req, res, next) => {
    try {
        const { error } = loginValidation(req.body);

        if (error) return next(new HttpException(400, error.message));

        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user || !(await user.matchesPassword(password))) {
            return next(new HttpException(400, 'Incorrect email or password'));
        }

        if(!user.verifiedAt) {
            return next(new HttpException(400, 'Email is not verified'));
        }

        logIn(req, user.id);
        res.status(200).json({message: 'Successfully logged in'});
    } catch (err) {
        return next(new HttpException(400, err.message));
    }
};

// - POST - /logout # logout a user
export const logout = async (req, res, next) => {
    try {
        await logOut(req, res);

        res.status(200).json({message: 'Successfully logged out'});
    } catch (err) {
        return next(new HttpException(400, err.message));
    }
};

// - POST - /email/verify # verifies user email
export const verifyEmail = async(req, res, next) => {
    try {
        const { error } = verifyEmailValidation(req.body);

        if (error) return next(new HttpException(400, 'Invalid verification link'));

        const { id } = req.body;

        const user = await User.findById(id).select('verifiedAt');

        if (!user || !User.hasValidVerificationUrl(req.body)) {
            return next(new HttpException(400, 'Invalid verification link'));
        }

        if (user.verifiedAt) {
            return next(new HttpException(400, 'Email is already verified'));
        }

        await markAsVerified(user);

        res.status(200).json({message: 'Email verified'});
    } catch (err) {
        return next(new HttpException(400, err.message));
    }
};

// - POST - /email/resend # resends activation link
export const resendVerify = async(req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email }).select('email verifiedAt');

        if(!user) {
            return next(new HttpException(400, 'Email not found'));
        }

        if(user.verifiedAt) {
            return next(new HttpException(400, 'Email is already verified'));
        }

        const link = user.generateVerificationUrl();

        await sendMail({
            to: email,
            subject: 'Verify your email address',
            html: verifyEmailTemplate(link)
        });


        res.status(200).json({message: 'Activation link was sent to your email'});
    } catch (err) {
        return next(new HttpException(400, err.message));
    }
};