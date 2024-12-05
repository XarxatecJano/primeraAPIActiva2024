import { fileURLToPath } from 'url';
import path from 'path';
import argon2 from 'argon2';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const argon2Config = {
    type: argon2.argon2d,
    memoryCost: Math.pow(2, 16),
    hashLength: 50,
};
const publicPath = path.join(__dirname, '../../public');
const configBaseURL = {
    development: {
        baseURL: process.env.DEV_URL,
    },
    production: {
        baseURL: process.env.PROD_URL,
    },
};
const baseURL = process.env.NODE_ENV === 'production' ? process.env.PROD_URL : process.env.DEV_URL;
export { publicPath, __dirname, argon2Config, baseURL };
