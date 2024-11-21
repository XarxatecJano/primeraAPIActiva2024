import { fileURLToPath } from 'url';
import path from 'path';
import argon2 from 'argon2';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argon2Config = {
    type: argon2.argon2d,
    memoryCost: 2 ** 16,
    hashLength: 50,
}
const publicPath = path.join(__dirname, '../../public');  

export { publicPath, __dirname, argon2Config };