import { Request, Response } from 'express';
import { IUserService } from '../interfaces/IUserService';
import { UserService } from '../services/userService';

export class UserController {
  private userService: IUserService;
  constructor(userService: IUserService = new UserService()) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    return res.json(users);
  }
}
