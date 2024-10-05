import dotenv from 'dotenv';

dotenv.config();

export default {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL as string,
  databaseDebug: process.env.DATABASE_DEBUG === 'true',
  jwtAccessSecretKey: process.env.JWT_ACCESS_SECRET as string,
  jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET as string,
  jwtAccessExpireDate:process.env.JWT_ACCESS_EXPIRES_IN as string,
  jwtRefreshExpireDate:process.env.JWT_REFRESH_EXPIRES_IN as string,
};
