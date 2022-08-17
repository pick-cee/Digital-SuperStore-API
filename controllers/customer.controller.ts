import baseService from "../services/baseService";
import customerService from "../services/customerService";
import express from "express";
import { sendmail } from "../helpers/mailer"
import { jwtSign } from "../helpers/auth";
import generateToken from '../helpers/generateToken'
import customerModel from "../models/customer.model";

const CustomerService = new customerService()

export async function registerCustomer(request: express.Request, response: express.Response) {
    try {
        const { name, email, password } = request.body
        const customer = await CustomerService.register(name, email, password)
        await customer.save()
        const random = await generateToken(customer._id)
        let subject = "DIGITAL SUPERSTORE";
        let html = `
        <br /><div style="flex-direction:column; justify-content:center; align-items:center;">
            <h1>Registration successful!</h1>
            <p>Your details have been captured.</p>
            <p>Please use this code to veriy your email: ${random}</p>
            <p>This token will expire in 10 minutes</p>
            <p>Digital Superstore! </p><br><br>
        </div>
        `;
        await sendmail(html, subject, customer.email)
        return response.status(200).json({
            message: "User registered successfully, check inbox or spam folder for verification code",
            data: customer
        })
    }
    catch (err: any) {
        console.log(err.message)
        return response.status(500).json({
            message: `Error: ${err.message}`
        })
    }

}

export async function loginCustomer(request: express.Request, response: express.Response) {
    try {
        const customer = await CustomerService.authenticate(request.body.email, request.body.password)
        if (!customer) {
            return response.status(400).json({
                message: "Invalid email or password"
            })
        }
        let payload = {
            _id: customer._id,
            email: customer.email,
        }
        const token = await jwtSign(payload)
        return response.status(200).json({
            message: "User logged in successfully!",
            token: token
        })
    }
    catch (err: any) {
        console.log(err)
        return response.status(500).json({
            message: err.message
        })
    }

}
export async function forgotPassword(request: express.Request, response: express.Response) {
    const email = request.body.email
    try {
        await CustomerService.forgetPassword(email)
        return response.status(200).json({
            message: "Reset token code successfully, check inbox or spam folder for verification code"
        })
    }
    catch (err: any) {
        console.log(err.message)
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function resetPassword(request: express.Request, response: express.Response) {
    const { token, password, confirmPassword } = request.body
    try {
        await CustomerService.resetPassword(token, password, confirmPassword)
        return response.status(200).json({
            message: "Password reset successfully"
        })
    }
    catch (err: any) {
        console.log(err.message)
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function getByEmail(request: express.Request, response: express.Response) {
    const email = request.query.email as string
    try {
        const customer = await CustomerService.getByEmail(email)
        return response.status(200).json({
            message: "User found",
            customer
        })
    }
    catch (err: any) {
        console.log(err.message)
        return response.status(500).json({ message: err.message })
    }
}

export async function getById(request: express.Request, response: express.Response) {
    const id = request.params.id as string
    try {
        const customer = await CustomerService.getById(id)
        return response.status(200).json({
            message: "User found",
            customer
        })
    }
    catch (err: any) {
        console.log(err.message)
        return response.status(500).json({ message: err.message })
    }
}

export async function verifyEmail(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const { token } = request.body
    try {
        await CustomerService.verifyEmail(userId, token)
        return response.status(200).json({
            message: "User verified successfully"
        })
    }
    catch (err: any) {
        console.log(err.message)
        return response.status(500).json({ message: err.message })
    }
}

export async function resendToken(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const email = request.body
    try {
        await CustomerService.resendToken(userId, email)
        return response.status(200).json({
            message: "Token resent successfully!"
        })
    }
    catch (err: any) {
        console.log(err.message)
        return response.status(500).json({ message: err.message })
    }
}