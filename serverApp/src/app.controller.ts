import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('access')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<string> {
    return 'HelloWorld';
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }
}
