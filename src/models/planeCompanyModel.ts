import { eq } from 'drizzle-orm';
import { db } from '../database';
import { IPlaneCompany } from '../interfaces/IPlaneCompany';
import { IPlaneCompanyModel } from '../interfaces/IPlaneCompany';
import { planeCompanies } from '../schema';

export class PlaneCompanyModel implements IPlaneCompanyModel {
  async createPlaneCompany(planeCompany: IPlaneCompany): Promise<IPlaneCompany> {
    return (
      await db.insert(planeCompanies).values(planeCompany).returning().execute()
    )[0] as IPlaneCompany;
  }
  async getPlaneCompanyByEmail(email: string): Promise<IPlaneCompany | null> {
    return (await db.query.planeCompanies.findFirst({
      where: eq(planeCompanies.email, email),
    })) as IPlaneCompany | null;
  }
}
