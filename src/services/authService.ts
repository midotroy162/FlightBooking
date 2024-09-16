import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
import { IAuthService } from '../interfaces/IAuthService';
import { UserModel } from '../models/userModel';

export class AuthService implements IAuthService {
    private userModel: IUserModel;
    constructor(userModel: IUserModel=new UserModel()) {
        this.userModel = userModel;
    }
    async signup(user: IUser): Promise<IUser> {
        return this.userModel.createUser(user);
    }
}