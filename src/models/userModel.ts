import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUser';
import { users } from '../schema';
import { BaseModel } from '.';
import { QueryBuilder } from '../helper/queryBuilder';

export class UserModel extends BaseModel<typeof users> implements IUserModel {
  protected table = users;

  async getUserByEmail(email: string): Promise<IUser | null> {
    return this.findOneByFilterQuery(new QueryBuilder().where('email', '=', email));
  }
}
