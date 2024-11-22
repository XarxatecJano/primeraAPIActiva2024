import argon2 from 'argon2';
import { LoginUser } from '../types/LoginUser.js';
import { findUserByUsername } from '../models/userModel.js';
import { LoginResult } from '../types/LoginResult.js';



export async function userLogin(user: LoginUser): Promise<any>{
    const result:LoginResult = {
        success: false,
        message: 'Error desconocido',
        statusCode: 500
    }
    try {
        const userData = await findUserByUsername(user.userName);
        if(userData.rowCount === 0){
            result.message = 'Usuario no encontrado';
            result.statusCode = 404;
        } else {
            if (await argon2.verify(userData.rows[0].password, user.password)){
                result.success = true;
                result.message = 'Usuario encontrado';
                result.statusCode = 200;
                result.data = userData.rows;
            } else {
                result.message = 'Contraseña incorrecta';
                result.statusCode = 401;
            }
        }
    }
    catch(error){
        if (error instanceof Error) result.message = error.message;
    }

    return result;
}