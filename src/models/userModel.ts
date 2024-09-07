import { eq } from 'drizzle-orm';
import { db } from '../database';
import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';
import { users } from '../schema';

export class UserModel implements IUserModel {
  async getAllUsers(): Promise<IUser[]> {
    return (await db.select().from(users).execute()) as IUser[];
  }
  async getUserById(id: number): Promise<IUser | null> {
    return (await db.query.users.findFirst({
      where: eq(users.id, id),
    })) as IUser | null;
  }
  async createUser(user: IUser): Promise<IUser> {
    return (await db.insert(users).values(user).execute())[0] as IUser;
  }
  async updateUser(id: number, user: IUser): Promise<IUser | null> {
    return (await db.update(users).set(user).where(eq(users.id, id)).execute())[0] as IUser | null;
  }
  async deleteUser(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id)).execute();
  }
}
