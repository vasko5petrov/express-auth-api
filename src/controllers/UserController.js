import User from '../models/UserSchema';
import HttpException from '../exceptions/HttpException';
import { registerValidation }  from '../utils/validations/userValidations';
import bcrypt from 'bcrypt';

// - GET - /getUser?id={i} # returns a user with id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.query.id);

        res.send({
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            CreatedAt: user.createdAt
        });
    } catch (err) {
        next(new HttpException(404, `User with ID ${req.query.id} was not found`));
    }
};

// - POST - /createUser # creates a user
export const createUser = async (req, res, next) => {
    const { error } = registerValidation(req.body);

    if (error) return next(new HttpException(400, error.message));

    const emailExist = await User.findOne({Email: req.body.Email});
    if (emailExist) return next(new HttpException(400, "User with this email already exist"));

    try {
        let user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);
        
        await user.save();
        res.status(200).send({Message: "Account successfully created"});
    } catch (err) {
        return next(new HttpException(400, err.message));
    }
};
