import { JsonArray } from "./JsonArray";

export interface LoginResult {
    success: boolean;
    message: string;
    statusCode:number;
    data?: JsonArray[];
}