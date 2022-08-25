import { jwtVerify } from "../helpers/auth"
import jwt from 'jsonwebtoken'
import express from 'express'
import customerModel from "../models/customer.model";
import adminModel from "../models/admin.model";

export async function verifyToken(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
        const authHeader = request.headers.token as string;
        let result
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, `${process.env.JWT_SECRET}`, async (err, user: any) => {
                if (err) return response.status(403).json({ message: "Invalid bearer token" })
                const userExists = await customerModel.findById(user._id).exec()
                if (userExists) {
                    request.user = user
                    next()
                }
                else {
                    return response.status(401).json({ message: "Please sign up" })
                }
            })
        }
        else {
            return response.status(401).json({ message: "You are not authenticated!" })
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({
            err: err,
        });
    }
}

export async function verifyAdminToken(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
        const authHeader = request.headers.token as string;
        let result
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, `${process.env.JWT_SECRET}`, async (err, admin: any) => {
                if (err) return response.status(403).json({ message: "Invalid bearer token" })
                const adminExists = await adminModel.findById(admin._id).exec()
                if (adminExists) {
                    request.user = admin
                    next()
                }
                else {
                    return response.status(401).json({ message: "Please sign up" })
                }
            })
        }
        else {
            return response.status(401).json({ message: "You are not authenticated!" })
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({
            err: err,
        });
    }
}