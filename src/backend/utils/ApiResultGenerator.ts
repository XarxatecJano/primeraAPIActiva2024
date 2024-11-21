import { Query, QueryResult } from "pg";
import { ApiResult } from "../types/ApiResult.js";

export class ApiResultGenerator{

    static getResult(result: QueryResult | Error):ApiResult{
        let getResult: ApiResult = {
            statusCode: 500,
            success: false,
            message: `Error desconocido`
        };
        if ('rows' in result && 'rowCount' in result && result.rowCount != null) {
            getResult = {
                statusCode: 200,
                success: true,
                message: 'Usuarios obtenidos correctamente',
                rowsAffected: result.rowCount,
                data: result.rows
            };
        }
        if (result instanceof Error && 'code' in result && result.code === 'ECONNREFUSED') {
            getResult = {
                statusCode:503,
                success: false,
                message: `El servicio de la base de datos no está disponible`
            };
        }
        return getResult;
    }
    
    static postResult(result: QueryResult | Error):ApiResult{
     
        let postResult: ApiResult = {
            statusCode:500,
            success: false,
            message: `Error desconocido`
        };
        if('rowCount' in result && result.rowCount && result.rowCount > 0){
            postResult = {
                statusCode: 201,
                success: true,
                message: 'Usuario creado correctamente',
                rowsAffected: result.rowCount
            } 
        };
        if (result instanceof Error && 'code' in result && result.code === "23505") {
            const detail = (result as any).detail;
            const columnMatch = detail?.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            postResult = {
                statusCode:409, 
                success: false,
                message: `El ${columnName} ya existe en la base de datos`
            };
        } 
        if (result instanceof Error && 'code' in result && result.code === 'ECONNREFUSED') {
            postResult = {
                statusCode:503,
                success: false,
                message: `El servicio de la base de datos no está disponible`
            };
        }
        return postResult;
    }
    
    static deleteResult(result: QueryResult | Error):ApiResult{
        
        let deleteResult: ApiResult = {
            statusCode: 500,
            success: false,
            message: `Error desconocido`
        };

        if (result instanceof Error &&  'code' in result && result.code === 'ECONNREFUSED'){
           deleteResult =  {
                statusCode: 503,
                success: false,
                message: `El servicio de la base de datos no está disponible`
            };
        }

        if ('rowCount' in result) {
            if (result.rowCount != null && result.rowCount > 0) {
                deleteResult = {
                    statusCode: 204,
                    success: true,
                    message: 'Usuario eliminado correctamente',
                    rowsAffected: result.rowCount
                };
            } else {
                deleteResult = {
                    statusCode: 404,
                    success: false,
                    message: 'No se encontró el usuario',
                    rowsAffected: 0
                };
            }
        }

        return deleteResult;
    }

    static putResult(result: QueryResult | Error):ApiResult{
        
        let putResult: ApiResult = {
            statusCode: 500,
            success: false,
            message: `Error desconocido`
        };

        if (result instanceof Error && 'code' in result && result.code === "23505") {
            const detail = (result as any).detail;
            const columnMatch = detail?.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            putResult = {
                statusCode:409, 
                success: false,
                message: `El ${columnName} ya existe en la base de datos`
            }
        } else if (result instanceof Error &&  'code' in result && result.code === 'ECONNREFUSED') {

            putResult =  {
                statusCode: 503,
                success: false,
                message: `El servicio de la base de datos no está disponible`
            };
        }

        if ('rowCount' in result) {
            if (result.rowCount != null && result.rowCount > 0) {
                putResult = {
                    statusCode: 204,
                    success: true,
                    message: 'Usuario actualizado correctamente',
                    rowsAffected: result.rowCount
                };
            } else {
                putResult = {
                    statusCode: 404,
                    success: false,
                    message: 'No se encontró el usuario',
                    rowsAffected: 0
                };
            }
        }

        return putResult;
    }
    
}