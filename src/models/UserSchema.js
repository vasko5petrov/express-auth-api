import { Schema, model } from "mongoose";
import { hash, compare } from 'bcrypt';

export const UserSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: false},
    Email: {type: String, required: true},
    Password: {type: String, required: true}
}, {
    timestamps: true
});

UserSchema.pre('save', async function() {
    if(this.isModified('Password')) {
        this.Password = await hash(this.Password, 12);
    }
});

UserSchema.methods.matchesPassword = function(password) {
    return compare(password, this.Password);
}

UserSchema.set('toJSON', {
    transform: (doc, { __v, Password, ...rest}, options) => rest
});

export default model('User', UserSchema);