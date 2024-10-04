import { IUser, IUserResponse } from '../interfaces/IUser';

export class UserResponse {
  private user = {} as IUser;
  private users: IUser[] = [];
  constructor(user: IUser | null, users: IUser[] | null = []) {
    this.user = user ?? ({} as IUser);
    this.users = users ?? ([] as IUser[]);
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

  public getUsers(): IUserResponse[] {
    return this.users.map((user) => new UserResponse(user).getUser());
  }
}
