import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: false},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    createdAt: { type: Date, default: Date.now}
});

export default model('User', UserSchema);