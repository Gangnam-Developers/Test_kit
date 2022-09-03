import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    return {
      email: payload.email,
      access_token: payload.access_token,
    };
  }
}
