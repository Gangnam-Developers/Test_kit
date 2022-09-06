import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BASEURL } from 'src/constants/url';
import { AuthInput } from 'src/struct/input/input';
import { UserService } from '../users/user.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login = async ({ access_token }: AuthInput) => {
    const userInfoResponse = await lastValueFrom(
      this.httpService.get(
        `${process.env.GOOGLE_BASE}${BASEURL.GOOGLE_USER_INFO}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
    );

    if (userInfoResponse.statusText === 'OK') {
      const query = await this.userService.getUser(userInfoResponse.data.email);

      if (!query) {
        try {
          await this.userService.create({
            name: userInfoResponse.data.name,
            email: userInfoResponse.data.email,
            picture: userInfoResponse.data.picture,
            rate: 0,
          });

          const payload = {
            name: userInfoResponse.data.name,
            email: userInfoResponse.data.email,
            picture: userInfoResponse.data.picture,
          };

          return {
            access_token: this.jwtService.sign(payload),
          };
        } catch (error) {
          return new Error(error);
        }
      } else if (query) {
        const payload = {
          name: query.name,
          email: query.email,
          picture: query.picture,
        };

        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
  };
}
