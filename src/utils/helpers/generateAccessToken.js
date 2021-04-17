import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, { expiresIn: 604800 });

export default generateAccessToken;