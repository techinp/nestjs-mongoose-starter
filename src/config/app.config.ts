import { registerAs } from '@nestjs/config';
import { EnvironmentVariables } from './app.dto';

export default registerAs(
  'app',
  (): EnvironmentVariables => ({
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
    mongodbUri: process.env.MONGO_URI,
  }),
);
