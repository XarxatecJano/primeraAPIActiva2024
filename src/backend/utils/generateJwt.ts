import jwt from "jsonwebtoken";

export function generateJwt():string {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({}, secret, {algorithm: "HS256", expiresIn: '1h'});
    return token;
}