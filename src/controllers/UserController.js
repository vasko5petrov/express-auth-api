import User from '../models/UserSchema';
import HttpException from '../exceptions/HttpException';
import { registerValidation, loginValidation }  from '../utils/validations/userValidations';
import { logIn, logOut } from '../auth';

// - GET - /getUser?id={i} # returns a user with id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId)

        res.json(user);
    } catch (err) {
        next(new HttpException(404, `User was not found`));
    }
};

// - POST - /createUser # creates a user
export const createUser = async (req, res, next) => {
    try {
        const { error } = registerValidation(req.body);

        if (error) return next(new HttpException(400, error.message));

        const emailExist = await User.exists({Email: req.body.Email});
        if (emailExist) return next(new HttpException(400, 'User with this email already exist'));

        let user = await User.create(req.body);
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

        const { Email, Password } = req.body;
        const user = await User.findOne({Email});
        if (!user || !(await user.matchesPassword(Password))) {
            return next(new HttpException(400, 'Incorrect email or password'));
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