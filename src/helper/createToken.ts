// import jwt from 'jsonwebtoken';
// import config from '../config';

// const createToken = (payload:string|number) =>
//   jwt.sign({ userId: payload }, config.jwtSecretKey , {
//     expiresIn: config.jwtExpireDate,
//   });

// export default createToken;
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config';
class TokenService {
  private accessTokenSecret: Secret;
  private refreshTokenSecret: Secret;
  private accessTokenExpiry: string;
  private refreshTokenExpiry: string;

  constructor() {
    this.accessTokenSecret = config.jwtAccessSecretKey;
    this.refreshTokenSecret = config.jwtRefreshSecretKey;
    this.accessTokenExpiry = config.jwtAccessExpireDate;
    this.refreshTokenExpiry = config.jwtRefreshExpireDate;
  }

  // 1. Create Access Token
  public createAccessToken(payload:string|number){
    return jwt.sign({userId:payload}, this.accessTokenSecret, { expiresIn: this.accessTokenExpiry });
  }

  // 2. Create Refresh Token
  public createRefreshToken(payload:string|number): string {
    return jwt.sign({userId:payload}, this.refreshTokenSecret, { expiresIn: this.refreshTokenExpiry });
  }

  // 3. Verify Access Token
  // public verifyAccessToken(token: string|number): JwtPayload | null {
  //   try {
  //     return jwt.verify(token, this.accessTokenSecret) as JwtPayload;
  //   } catch (error) {
  //     console.error('Invalid Access Token', error);
  //     return null;
  //   }
  // }

  // // 4. Verify Refresh Token
  // public verifyRefreshToken(token: string): JwtPayload | null {
  //   try {
  //     return jwt.verify(token, this.refreshTokenSecret) as JwtPayload;
  //   } catch (error) {
  //     console.error('Invalid Refresh Token', error);
  //     return null;
  //   }
  // }
}

export default TokenService;
