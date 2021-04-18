import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: false},
    Email: {type: String, required: true},
    Password: {type: String, required: true}
}, {
    timestamps: true
});

export default model('User', UserSchema);