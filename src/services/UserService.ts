import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import IUserData from '../interfaces/IUserData';
import User from '../models/UserModel';
import mailService from './MailService';
import tokenService from './TokenService';

const SALT_GEN = 10;

class UserService {
  async registration(email: string, password: string): Promise<IUserData> {
    const searchedUser = await User.findOne({ email });
    if (searchedUser !== null) {
      throw new Error('User with email address already exists');
    }

    const salt = await bcrypt.genSalt(SALT_GEN);
    const passwordHash = await bcrypt.hash(password, salt);
    const activationLink = uuidv4();
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
