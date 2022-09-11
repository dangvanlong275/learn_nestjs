export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: ['dist/entity/**/*.ts'],
    synchronize: false,
    migrations: ['src/database/migration/**/*.ts'],
    cli: {
      migrationsDir: 'src/database/migration',
      entitiesDir: 'src/entity',
      subscribersDir: 'src/subscriber',
    },
    subscribers: ['dist/subscriber/**/*.ts'],
    migrationsTableName: 'custom_migration_table',
  },
  passport: {
    secretkey: process.env.SECRETKEY,
  },
});
