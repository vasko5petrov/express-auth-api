import User from '../models/UserSchema';
import HttpException from '../exceptions/HttpException';

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
    const emailExist = await User.findOne({Email: req.body.Email});
    if (emailExist) return next(new HttpException(400, "User with this email already exist"));

    const user = new User(req.body);
    try {
        const createdUser = await user.save();
        res.status(200).send({Message: "Account successfully created"});
    } catch (err) {
        res.send(err);
    }
};
