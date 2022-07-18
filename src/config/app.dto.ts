export interface EnvironmentVariables {
  nodeEnv: string;
  port: number;
  mongodbUri: string;
}

export enum AppEnvVars {
  nodeEnv = 'app.nodeEnv',
  port = 'app.port',
  mongodbUri = 'app.mongodbUri',
}
