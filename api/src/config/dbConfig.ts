import type { DataSourceOptions } from 'typeorm';

import * as Entities from '@@entities/index.js';
import { ENV } from '@@constants/index.js';

const DB_PORT = Number(ENV.DATABASE.PORT);

const dbConfig: DataSourceOptions = {
    type: "postgres",
    host: ENV.DATABASE.HOST,
    port: DB_PORT,
    database: ENV.DATABASE.NAME,
    username: ENV.DATABASE.USERNAME,
    password: ENV.DATABASE.PASSWORD,
    synchronize: true,
    logging: false,
    entities: Entities,
    migrations: [],
    subscribers: []
};

export default dbConfig;