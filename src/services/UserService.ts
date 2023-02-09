import IAuthResponse from '../interfaces/IAuthResponse';
import User from '../models/UserModel';
import mailService from './MailService';
import tokenService from './TokenService';
import cryptoService from './CryptoService';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import UnauthorizedError from '../errors/UnauthorizedError';
import IUser from '../interfaces/IUser';

class UserService {
  public async registration(email: string, password: string): Promise<IAuthResponse> {
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

  public async login(email: string, password: string): Promise<IAuthResponse> {
    const searchedUser = await User.findOne({ email });
    if (searchedUser === null) {
      throw new NotFoundError('User not found');
    }

    const isValidPassword = await cryptoService.checkPassword(password, searchedUser.password);
    if (isValidPassword === false) {
      throw new UnauthorizedError('Login or password incorrect');
    }

    const payload = { id: String(searchedUser._id), email: searchedUser.email, isActivated: searchedUser.isActivated };
    const accessToken = tokenService.generateAccessToken(payload);
    const refreshToken = tokenService.generateRefreshToken(payload);
    await tokenService.saveToken(payload.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: payload,
    };
  }

  public async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken);
  }

  public async refresh(refreshToken: string): Promise<IAuthResponse> {
    if (refreshToken === undefined) throw new UnauthorizedError('User is not logged in');
    const isExists = await tokenService.isExist(refreshToken);
    if (isExists === false) throw new UnauthorizedError('User is not logged in');

    const tokenData = tokenService.verifyRefreshToken(refreshToken);
    if (tokenData === null || typeof tokenData === 'string') throw new UnauthorizedError('User is not logged in');

    const searchedUser = await User.findById(tokenData.id);
    if (searchedUser === null) throw new NotFoundError('User not found');

    const payload: IUser = {
      id: String(searchedUser._id),
      email: searchedUser.email,
      isActivated: searchedUser.isActivated,
    };
    const accessToken = tokenService.generateAccessToken(payload);
    const newRefreshToken = tokenService.generateRefreshToken(payload);
    await tokenService.saveToken(payload.id, newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user: payload,
    };
  }
}

export default new UserService();
