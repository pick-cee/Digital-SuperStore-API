import { jwtVerify } from "../helpers/auth"
import express from 'express'

export default async function verifyToken(request: express.Request, response: express.Response) {
    try {
        const authHeader = request.headers.token;
        let result
        if (authHeader) {
            const token = authHeader.slice(0, 1)
            result = await jwtVerify(token)
            if (!result) {
                response.status(400).json({ message: "Invalid bearer token!" })
            }
        }
        else {
            response.status(500).json({ message: "You are not autheticated!" })
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({
            err: err,
        });
    }
}
