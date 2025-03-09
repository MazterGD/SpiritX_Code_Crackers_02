
import dotenv from "dotenv";
dotenv.config();
const getEnv = (key: string, defaultValue?: string):string =>{
    const value = process.env[key];

    if(typeof value === 'undefined'){
        throw Error(`Missing String environment variable for ${key}`);
    }

    return value;
}

export const PORT =getEnv("PORT", process.env.PORT);
export const DB_PORT = getEnv('DB_PORT', process.env.DB_PORT);
export const DB_HOST = getEnv('DB_HOST', process.env.DB_HOST);
export const DB_USERNAME = getEnv('DB_USERNAME', process.env.DB_USERNAME);
export const DB_PASSWORD = getEnv('DB_PASSWORD', process.env.DB_PASSWORD);
export const DB_NAME = getEnv('DB_NAME', process.env.DB_NAME);
export const APP_ORIGIN = getEnv('APP_ORIGIN', process.env.APP_ORIGIN);
export const JWT_SECRET = getEnv('JWT_SECRET', process.env.JWT_SECRET);
