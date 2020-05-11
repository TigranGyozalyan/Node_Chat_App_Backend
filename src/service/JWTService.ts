import { Service } from 'typedi';
import JWT from 'jsonwebtoken';
import { UserDto } from '../domain/dto/UserDto';

@Service()
export default class JWTService {
  private secret: string = process.env.JWT_SECRET!;

  generateToken(user: UserDto): string {
    const { _id } = user;
    const payload = { _id };
    return JWT.sign(payload, this.secret, { expiresIn: '1 day' });
  }

  validateToken(token: string) : any {
    return JWT.verify(token, this.secret);
  }
}
