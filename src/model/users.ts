import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    role: string;
    isDisabled: boolean;
    firstName: string;
    lastName: string;
}


export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Password is under 6 symbols']
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    isDisabled: {type: Boolean, default: false},
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    }
}, {
    versionKey: false, timestamps: true,
    toJSON: {
        transform(doc, ret) {
            Reflect.deleteProperty(ret, '_id');
            Reflect.deleteProperty(ret, '__v');
            Reflect.deleteProperty(ret, '__t');
            ret.userId = doc._id;
        }
    }
});

const UserModel = model<IUser>('Users', UserSchema);

export { UserModel };
