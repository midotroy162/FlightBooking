import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/IAuthService';
import { IUser } from '../interfaces/IUser';
import { AuthService } from '../services/authService';

export class AuthController {
  private authService: IAuthService;
  constructor(authService: IAuthService = new AuthService()) {
    this.authService = authService;
  }
  async signup(req: Request, res: Response) {
    const { statusCode, data, AccessToken: token } = await this.authService.signup(req.body);
    console.log(data);

    res.status(statusCode).json({ user: data, token: token });
  }
}
