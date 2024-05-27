import dotenv from 'dotenv';

dotenv.config();

export const IS_DEV = process.env.ENVIRONMENT === "DEV";
export const IS_STAGING = process.env.ENVIRONMENT === "STAGING";
export const IS_PROD = process.env.ENVIRONMENT === "PROD";
export const IS_TEST = process.env.ENVIRONMENT === "TEST";

export const BASE_URL = process.env.BASE_URL as string;

export const API_PORT = process.env.API_PORT as string;
export const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const DATABASE = Object.freeze({
    PORT: process.env.DB_PORT as string,
    HOST: process.env.DB_HOST as string,
    NAME: process.env.DB_NAME as string,
    USERNAME: process.env.DB_USERNAME as string,
    PASSWORD: process.env.DB_PASSWORD as string
});