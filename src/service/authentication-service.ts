import { UserModel } from "../model/users";
import BCryptManager from "../manager/bcrypt-manager";
import { Tokenizer } from "../manager/tokenizer";
import AppError from "../middleware/app-error";

class AuthenticationService {

    async register(data, callback) {
        try {
            const user = new UserModel();
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.username = data.username;
            user.email = data.email;
            user.password = <string>await BCryptManager.hash(data.password);
            await user.save();
            const token = Tokenizer.encode({
                uid: user._id,
                role: user.role
            });
            callback.onSuccess({
                userId: user.id,
                firstName: user.firstName,
                username: user.username,
                email: user.email,
                token: token
            }, 'User successfully registered', 201);
        } catch (e) {
            callback.onError(e);
        }
    }

    async login(username, password, callback) {
        const dbUser = await UserModel.findOne({username: {$in: [username]}});

        const doesPasswordMatch = await BCryptManager.compare(password, dbUser.password);
        if (!doesPasswordMatch) {
            return callback.onError(new AppError('Wrong username or password', 404));
        }
        const token = Tokenizer.encode({
            uid: dbUser._id,
            role: dbUser.role
        });
        callback.onSuccess({
            userId: dbUser.id,
            firstName: dbUser.firstName,
            username: dbUser.username,
            email: dbUser.email,
            token: token
        }, 'Login Successfully', 200);
    }
}

export default AuthenticationService;
