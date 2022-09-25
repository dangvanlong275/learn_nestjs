export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false,
    entities: [process.env.ENTITIES],
    synchronize: false,
    migrations: [process.env.MIGRATIONS],
    // cli: {
    //   migrationsDir: 'src/database/migration',
    //   entitiesDir: 'src/entity',
    //   subscribersDir: 'src/subscriber',
    // },
    subscribers: [process.env.SUBSCRIBERS],
    migrationsTableName: process.env.MIGRATIONSTABLENAME,
  },
  passport: {
    secretkey: process.env.SECRETKEY,
  },
});
