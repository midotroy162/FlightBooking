import { Request, Response } from 'express';
import { IAuthService, IPlaneCompanyService } from '../interfaces/IAuthService';
import { IUser } from '../interfaces/IUser';
import { AuthPlaneCompanyService, AuthService } from '../services/authService';
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

    return res
      .status(statusCode)
      .json(createApiResponse(success, statusCode, message, data, token));
  }
  async login(req: Request, res: Response) {
    const {
      statusCode,
      success,
      message,
      data,
      accessToken: token,
    } = await this.authService.login(req.body);
    return res
      .status(statusCode)
      .json(createApiResponse(success, statusCode, message, data, token));
  }
}

export class PlaneCompanyAuthController {
  private authPlaneCompanyService: IPlaneCompanyService;
  constructor(authPlaneCompanyService: IPlaneCompanyService = new AuthPlaneCompanyService()) {
    this.authPlaneCompanyService = authPlaneCompanyService;
  }
  async signup(req: Request, res: Response) {
    const {
      statusCode,
      success,
      message,
      data,
      accessToken: token,
    } = await this.authPlaneCompanyService.signup(req.body);
    return res
      .status(statusCode)
      .json(createApiResponse(success, statusCode, message, data, token));
  }
  async login(req: Request, res: Response) {
    const {
      statusCode,
      success,
      message,
      data,
      accessToken: token,
    } = await this.authPlaneCompanyService.login(req.body);
    return res
      .status(statusCode)
      .json(createApiResponse(success, statusCode, message, data, token));
  }
}
