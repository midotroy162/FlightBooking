import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
import { IAuthService } from '../interfaces/IAuthService';
import { UserModel } from '../models/userModel';
// import { compareSync } from 'bcrypt';

export class AuthService implements IAuthService {
    private userModel: IUserModel;
    constructor(userModel: IUserModel=new UserModel()) {
        this.userModel = userModel;
    }
    async signup(user: IUser): Promise<IUser> {
        return this.userModel.createUser(user);
    }
    async login(data:IUser):Promise<IUser>{
        const user = await this.userModel.getUserByEmail(data.email);
        if(!user|| !(data.password=== user.password)) throw new Error("Invalid email or password");
        return user;
    }
}