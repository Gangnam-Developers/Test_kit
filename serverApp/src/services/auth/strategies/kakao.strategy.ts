import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  /**
   *
   */
  constructor() {
    super({
      clientID: `${process.env.KAKAO_CLIENT_ID}`,
      clientSecret: `${process.env.KAKAO_SECRET}`,
      callbackURL: `${process.env.KAKAO_CALLBACKURL}`,
    });
  }

  async validate(access_token, expires_in: number): Promise<any> {
    const auth = { access_token, expires_in };
    return auth;
  }
}
