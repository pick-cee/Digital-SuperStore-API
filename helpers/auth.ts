import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function jwtSign(payload: any) {
    return await jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1h' })
}

export async function jwtVerify(token: any) {
    try {
        return await jwt.verify(token, `${process.env.JWT_SECRET}`)
    }
    catch (err) {
        return false;
    }
}