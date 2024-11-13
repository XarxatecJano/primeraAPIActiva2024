import { deleteUserById, findUserById, getUsers, saveNewUser, updateUserById } from "../models/userModel.js";
import { ApiResult } from "../types/ApiResult.js";
import { User } from "../types/User.js";
import { ApiResultGenerator } from "../utils/ApiResultGenerator.js";


export async function newUser(user: User):Promise<ApiResult>{
    let apiResult: ApiResult;    
    try{
        const result = await saveNewUser(user);
        apiResult =  ApiResultGenerator.postResult(result);
    }  catch (error) {
        if (error instanceof Error) {
            apiResult =  ApiResultGenerator.postResult(error);
        } else {
            apiResult =  ApiResultGenerator.postResult(new Error('Error desconocido'));
        }
    }
    return apiResult;
}

export async function getAllUsers():Promise<string>{
    const result = await getUsers();
    return result;
}

export async function getUser(id:string):Promise<string>{
    const result = await findUserById(id);
    return result;
}

export async function deleteUser(id:string):Promise<ApiResult>{
    let apiResult: ApiResult;    
    try{
        const result = await deleteUserById(id);
        apiResult =  ApiResultGenerator.deleteResult(result);
    }  catch (error) {
        if (error instanceof Error) {
            apiResult =  ApiResultGenerator.deleteResult(error);
        } else {
            apiResult =  ApiResultGenerator.deleteResult(new Error('Error desconocido'));
        }
    }
    return apiResult;
}

export async function updateUser(user:User):Promise<ApiResult>{
    let apiResult: ApiResult;    
    try{
        const result = await updateUserById(user);
        apiResult =  ApiResultGenerator.putResult(result);
    }  catch (error) {
        if (error instanceof Error) {
            apiResult =  ApiResultGenerator.putResult(error);
        } else {
            apiResult =  ApiResultGenerator.putResult(new Error('Error desconocido'));
        }
    }
    return apiResult;
}