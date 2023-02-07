import jwt, { Secret } from 'jsonwebtoken';
import { Payload } from '../types/Payload';
import tokenModel from '../models/TokenModel';

class TokenService {
  public generateAccessToken(payload: Payload): string {
    const secret = process.env.ACCESS_SECRET_KEY as Secret;
    return jwt.sign(payload, secret, { expiresIn: '24h' });
  }

  public generateRefreshToken(payload: Payload): string {
    const secret = process.env.REFRESH_SECRET_KEY as Secret;
    return jwt.sign(payload, secret, { expiresIn: '10d' });
  }

  public async saveToken(userID: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userID });
    if (tokenData !== null) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await tokenModel.create({ user: userID, refreshToken });
  }

  public async removeToken(refreshToken: string) {
    return await tokenModel.deleteOne({ refreshToken: refreshToken });
  }
}

export default new TokenService();
