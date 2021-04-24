import { Schema, model } from "mongoose";
import { hash, compare } from 'bcrypt';

export const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {
    timestamps: true
});

UserSchema.pre('save', async function() {
    if(this.isModified('password')) {
        this.password = await hash(this.password, 12);
    }
});

UserSchema.methods.matchesPassword = function(password) {
    return compare(password, this.password);
}

UserSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest}, options) => rest
});

export default model('User', UserSchema);