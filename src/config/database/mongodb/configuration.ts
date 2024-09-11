import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME
}));
