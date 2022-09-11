import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '111111',
  database: 'nest_js',
  synchronize: true,
  logging: false,
  entities: ['dist/entities/**/*.entity.{ts,js}'],
  migrations: ['dist/database/migration/**/*.{ts,js}'],
  subscribers: ['dist/subscriber/**/*.{ts,js}'],
  migrationsTableName: 'custom_migration_table',
};

export default config;
