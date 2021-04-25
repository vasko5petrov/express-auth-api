import { Schema, model } from "mongoose";
import { hash, compare } from 'bcrypt';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { EMAIL_VERIFICATION_TIMEOUT, APP_ORIGIN_URL, APP_SECRET } from '../configs'

export const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    verifiedAt: Date
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

UserSchema.methods.generateVerificationUrl = function () {
    const token = createHash('sha1').update(this.email).digest('hex');
    const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT;
  
    const url = `${APP_ORIGIN_URL}/confirm?id=${this.id}&token=${token}&expires=${expires}`;
    const signature = User.signVerification(url);
  
    return `${url}&signature=${signature}`
}

UserSchema.statics.hasValidVerificationUrl = (body) => {
    const url = `${APP_ORIGIN_URL}/confirm?id=${body.id}&token=${body.token}&expires=${body.expires}`;
    const signature = User.signVerification(url);
  
    return timingSafeEqual(Buffer.from(signature), Buffer.from(body.signature)) && +body.expires > Date.now();
}

UserSchema.statics.signVerification = (url) => createHmac('sha256', APP_SECRET).update(url).digest('hex');

const User = model('User', UserSchema);

export default User;