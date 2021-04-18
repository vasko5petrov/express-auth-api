import User from '../models/UserSchema';
import HttpException from '../exceptions/HttpException';
import { registerValidation }  from '../utils/validations/registerValidations';
import { login } from '../auth';
import generateAccessToken from '../utils/helpers/generateAccessToken';
import bcrypt from 'bcrypt';

// - GET - /getUser?id={i} # returns a user with id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-Password -__v');

        res.json(user);
    } catch (err) {
        next(new HttpException(404, `User was not found`));
    }
};

// - POST - /createUser # creates a user
export const createUser = async (req, res, next) => {
    const { error } = registerValidation(req.body);

    if (error) return next(new HttpException(400, error.message));

    const emailExist = await User.exists({Email: req.body.Email});
    if (emailExist) return next(new HttpException(400, 'User with this email already exist'));

    try {
        let user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);
        
        await user.save();
        login(req, user.id);
        res.status(200).send({message: 'Account successfully created'});
    } catch (err) {
        return next(new HttpException(400, err.message));
    }
};

// - POST - /authenticate # auth a user
export const authenticate = async (req, res, next) => {

	if(!req.body.Email || !req.body.Password) return next(new HttpException(400, 'Please fill all fields'));

    try {
        const user = await User.findOne({Email: req.body.Email});
        const passwordMatches = await bcrypt.compare(req.body.Password, user.Password);
        if (!user || !passwordMatches) {
            return next(new HttpException(400, 'Incorrect email or password'));
        } 
        const token = generateAccessToken({Email: user.Email, CreatedAt: user.CreatedAt});
        res.json({
            authToken: `Bearer ${token}`
        });
    } catch (err) {
        return next(new HttpException(400, err.message));
    }
};
