import { Request, Response } from 'express';
import { IUserService } from '../interfaces/IUser';
import { UserService } from '../services/userService';
import { createApiResponse } from '../helper/response';
import { UserResponse } from '../responses/userResponse';

export class UserController {
  private userService: IUserService;
  constructor(userService: IUserService = new UserService()) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response) {
    const { statusCode, success, message, data } = await this.userService.getAllUsers();
    return res.json(
      createApiResponse(success, statusCode, message, new UserResponse(null, data).getUsers()),
    );
  }
}
