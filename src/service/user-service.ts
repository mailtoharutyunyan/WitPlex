import { UserModel } from "../model/users";

class UserService {

    static async findByUserName(username) {
        try {
            return await UserModel.find({username: username})
        } catch (e) {
            console.log(e)
        }
    }

}

export default UserService;
