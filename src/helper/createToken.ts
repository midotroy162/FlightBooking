import jwt from 'jsonwebtoken';
import config from '../config';

const createToken = (payload:string|number) =>
  jwt.sign({ userId: payload }, config.jwtSecretKey , {
    expiresIn: config.jwtExpireDate,
  });

export default createToken;