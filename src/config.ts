import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL as string,
  databaseDebug: process.env.DATABASE_DEBUG === 'true',
  jwtSecretKey: process.env.JWT_SECRET as string,
  jwtExpireDate:process.env.JWT_EXPIRES_IN as string
};
