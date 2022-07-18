import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables, AppEnvVars } from './config/app.dto';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    let mongoUri = this.configService.get<EnvironmentVariables>(
      AppEnvVars.mongodbUri,
    );
    return 'Hello World!';
  }
}
