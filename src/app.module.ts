import config from './config/app.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './models/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './models/auth/auth.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/success.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { AllExceptionsFilter } from './common/exceptions/http-exception.filter';
import { EnvironmentVariables, AppEnvVars } from './config/app.dto';

@Module({
  imports: [
    // Set env variable able to call is global
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      load: [config],
    }),
    // Connect with mongoose asynconous method (waiting for config module call success)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<EnvironmentVariables>(AppEnvVars.mongodbUri),
      }),
      inject: [ConfigService],
    }),
    // import
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
