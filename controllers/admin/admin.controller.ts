import adminService from "../../services/admin/adminService";
import express from 'express'
import { jwtSign } from "../../helpers/auth";

const AdminService = new adminService()

export async function Register(request: express.Request, response: express.Response) {
    try {
        const { name, email, password } = request.body
        await AdminService.Register(name, email, password).then((data) => {
            return response.status(200).json({
                message: "Admin crated succesfully",
                Data: data
            })
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function loginAdmin(request: express.Request, response: express.Response) {
    try {
        const admin = await AdminService.Authenticate(request.body.email, request.body.password)
        let payload = {
            _id: admin["_id"],
            email: admin["email"],
        }
        const token = await jwtSign(payload)
        return response.status(200).json({
            message: "Admin logged in successfully!",
            token: token
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function getUsers(request: express.Request, response: express.Response) {
    try {
        const users = await AdminService.getAllUsers()
        return response.status(200).json({
            message: "All users fetched.....",
            users
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function createProduct(request: express.Request, response: express.Response) {
    let data;

    if (request.fields) {
        data = JSON.parse(request.fields.data as string);
    }

    const { name, price, description, categories } = data;

    const image = request.files?.file;
    try {
        await AdminService.createProduct(name, price, description, image, categories)
        return response.status(200).json({
            message: "Product added succesfully",
            data: {
                name, price, description, categories, image
            }
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function getAllProducts(request: express.Request, response: express.Response) {
    try {
        const products = await AdminService.getAllProducts()
        return response.status(200).json({
            message: "All products fetched.....",
            products
        })
    }
    catch (err: any) {
        response.status(500).json({
            message: err.message
        })
    }
}

export async function deleteProduct(request: express.Request, response: express.Response) {
    const productId = request.query.productId as string
    try {
        await AdminService.deleteProduct(productId)
        response.status(200).json({
            message: "Product deleted succesfully"
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function updateProduct(request: express.Request, response: express.Response) {
    const productId = request.query.productId as string
    let data;

    if (request.fields) {
        data = JSON.parse(request.fields.data as string);
    }
    const image = request.files?.file;

    try {
        await AdminService.updateProduct(productId, data, image)
        return response.status(200).json({
            message: "Product updated succesfully",
            data, image
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function getUserStats(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    try {
        await AdminService.getUserMonthlyStats(userId).then((data) => {
            return response.status(200).json({
                message: `User ${userId} monthly stats fetched`,
                Data: data
            })
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function getAllUserStats(request: express.Request, response: express.Response) {
    try {
        await AdminService.getAllUsersMonthlyStats().then((data) => {
            return response.status(200).json({
                message: "All users monthly stats fetched successfully",
                Data: data
            })
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}