import jwt from 'jsonwebtoken';

// Token expires after 3 days
const generateAccessToken = (user) => jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, { expiresIn: 259200 });

export default generateAccessToken;