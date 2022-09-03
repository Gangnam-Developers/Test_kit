import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req) {
    if (!req.user) {
      return 'Authenticated failed';
    }

    return {
      message: 'Authenticated Succesfull',
      user: req.user,
    };
  }
}
