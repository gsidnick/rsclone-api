import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class CryptoService {
  private readonly saltRounds = 10;

  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  public async checkPassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }

  public generateUUID() {
    return uuidv4();
  }
}

export default new CryptoService();
