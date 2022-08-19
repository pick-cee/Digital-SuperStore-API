import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function jwtSign(payload: any) {
    return jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })
}

export function jwtVerify(token: any) {
    try {
        return jwt.verify(token, `${process.env.JWT_SECRET}`)
    }
    catch (err) {
        return false;
    }
}