import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/IAuthService';
import { IUser } from '../interfaces/IUser';
import { AuthService} from '../services/authService';
import createToken from '../helper/createToken';

export class AuthController { 
    private authService: IAuthService;
    constructor(authService:IAuthService= new AuthService()) {
    this.authService = authService;
  }
    async signup(req: Request, res: Response){
      const user = await this.authService.signup(req.body);
      console.log(user);
      
      const token = createToken(user.id);
      res.status(201).json({user:user,token:token});     
  }
  async login(req: Request, res: Response) {
    const user = await this.authService.login(req.body);
    if (!user) {
      res.json({message:""})
    }
    const token = createToken(user.id);
      res.status(201).json({user:user,token:token});
  }
}