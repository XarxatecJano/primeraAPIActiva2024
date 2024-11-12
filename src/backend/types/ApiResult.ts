export interface ApiResult {
    success: boolean;
    message: string;
    rowsAffected?: number;
    statusCode:number;
}