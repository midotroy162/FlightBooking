import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/IAuthService';
import { IUser } from '../interfaces/IUser';
import { AuthService } from '../services/authService';
import createToken from '../helper/createToken';
import { createApiResponse } from '../helper/response';

export class AuthController {
  private authService: IAuthService;
  constructor(authService: IAuthService = new AuthService()) {
    this.authService = authService;
  }
  async signup(req: Request, res: Response) {
    const {
      statusCode,
      success,
      message,
      data,
      accessToken: token,
    } = await this.authService.signup(req.body);

    return res.status(statusCode).json(createApiResponse(success, statusCode, message, data));
    res.status(statusCode).json({ user: data, token: token });
  }
  async login(req: Request, res: Response) {
    const {
      statusCode,
      success,
      message,
      data,
      accessToken: token,
    } = await this.authService.login(req.body);
    return res.status(statusCode).json(createApiResponse(success, statusCode, message, data));
  }
}
