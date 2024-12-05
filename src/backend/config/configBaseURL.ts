import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.NODE_ENV === 'production' ? process.env.PROD_URL : process.env.DEV_URL;


export { baseURL };