import { Request, Response } from 'express';
import { IAuthService, IPlaneCompanyService } from '../interfaces/IAuth';
import { IUser } from '../interfaces/IUser';
import { AuthPlaneCompanyService, AuthService } from '../services/authService';
import { createApiResponse } from '../helper/response';
import { UserResponse } from '../responses/userResponse';
import { PlaneCompanyResponse } from '../responses/planeCompanyResponse';

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
      .json(
        createApiResponse(success, statusCode, message, new UserResponse(data).getUser(), token),
      );
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
      .json(
        createApiResponse(success, statusCode, message, new UserResponse(data).getUser(), token),
      );
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
      .json(
        createApiResponse(
          success,
          statusCode,
          message,
          new PlaneCompanyResponse(data).getPlaneCompany(),
          token,
        ),
      );
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
      .json(
        createApiResponse(
          success,
          statusCode,
          message,
          new PlaneCompanyResponse(data).getPlaneCompany(),
          token,
        ),
      );
  }
}
