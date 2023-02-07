import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import IUserData from '../interfaces/IUserData';
import User from '../models/UserModel';
import mailService from './MailService';
import tokenService from './TokenService';
import cryptoService from './CryptoService';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';

class UserService {
  async registration(email: string, password: string): Promise<IUserData> {
    const searchedUser = await User.findOne({ email });
    if (searchedUser !== null) {
      throw new ConflictError('User with email address already exists');
    }

    const passwordHash = await cryptoService.hashPassword(password);
    const activationLink = cryptoService.generateUUID();
    const newUser = await User.create({ email, password: passwordHash, activationLink });
    await mailService.sendActivationCode(email, activationLink);

    const payload = { id: String(newUser._id), email: newUser.email, isActivated: newUser.isActivated };
    const accessToken = tokenService.generateAccessToken(payload);
    const refreshToken = tokenService.generateRefreshToken(payload);
    await tokenService.saveToken(payload.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: payload,
    };
  }
}

export default new UserService();
