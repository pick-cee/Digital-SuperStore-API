import customerModel from "../models/customer.model";
import customerService from "../services/customerService";
import express from "express";

const CustomerService = new customerService()

export async function loginCustomer(request: express.Request, response: express.Response) {
    const customer = await CustomerService.authenticate(request.body.email, request.body.password)
    if (!customer) {
        return response.status(400).json({
            message: "Invalid email or password"
        })
    }
    return response.status(200).json({
        message: "User logged in successfully!"
    })
}