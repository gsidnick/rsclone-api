import jwt, { Secret } from 'jsonwebtoken';
import { Payload } from '../types/Payload';
import tokenModel from '../models/TokenModel';

class TokenService {
  generateAccessToken(payload: Payload): string {
    const secret = process.env.ACCESS_SECRET_KEY as Secret;
    return jwt.sign(payload, secret, { expiresIn: '24h' });
  }

  generateRefreshToken(payload: Payload): string {
    const secret = process.env.REFRESH_SECRET_KEY as Secret;
    return jwt.sign(payload, secret, { expiresIn: '10d' });
  }

  async saveToken(userID: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userID });
    if (tokenData !== null) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await tokenModel.create({ user: userID, refreshToken });
  }
}

export default new TokenService();
