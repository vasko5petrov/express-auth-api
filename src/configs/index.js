import dotenv from 'dotenv';
dotenv.config();

export const serverPort = process.env.PORT || 3044;
export const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.nqlr8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;