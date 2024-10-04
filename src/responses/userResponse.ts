import { IUser, IUserResponse } from '../interfaces/IUser';

export class UserResponse {
  private user = {} as IUser;
  constructor(user: IUser | null) {
    this.user = user ?? ({} as IUser);
  }

  public getUser(): IUserResponse {
    if (!this.user) {
      return {} as IUserResponse;
    }
    return {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt,
    };
  }
}
