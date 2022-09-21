import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';

const env = dotenv.config().parsed;

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [env.ENTITIES],
  migrations: [env.MIGRATIONS],
  subscribers: [env.SUBSCRIBERS],
  migrationsTableName: env.MIGRATIONSTABLENAME,
};

export default config;
