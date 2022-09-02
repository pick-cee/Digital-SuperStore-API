import customerService from "../services/customerService";
import mongoose from "mongoose";
import express, { request, response } from "express";
import { sendmail } from "../helpers/mailer"
import { jwtSign } from "../helpers/auth";
import generateToken from '../helpers/generateToken'
import customerModel from "../models/customer.model";

const CustomerService = new customerService()

async function isEmailVerified(userId: string) {
    const user = await customerModel.findOne({ _id: userId })
    if (user?.isVerified == false) {
        throw new Error("Email is not verified")
    }
    return
}

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
            name: customer.name,
            email: customer.email,
            verified: customer.isVerified
        }
        const token = await jwtSign(payload)
        return response.status(200).json({
            message: "User logged in successfully!",
            token: token,
            user: payload
        })
    }
    catch (err: any) {
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
        return response.status(500).json({ message: err.message })
    }
}

export async function verifyEmail(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    try {
        await CustomerService.verifyEmail(userId, request.body.token as string)
        return response.status(200).json({
            message: "User verified successfully"
        })
    }
    catch (err: any) {
        return response.status(500).json({ message: err.message })
    }
}

export async function resendToken(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string

    try {
        await CustomerService.resendToken(userId, request.query.email as string)
        console.log(request.body.email);
        return response.status(200).json({
            message: "Token resent successfully!"
        })
    }
    catch (err: any) {
        return response.status(500).json({ message: err.message })
    }
}

export async function addProductsToCart(request: express.Request, response: express.Response) {
    // const userId = request.query.userId as string
    const userId = request.query.userId as string
    const productId = request.query.productId as string
    const { quantity } = request.body

    try {
        await isEmailVerified(userId)
        await CustomerService.addProductsToCart(userId, productId, quantity)
        return response.status(200).json({
            message: "Products added to cart successfully",
        })
    }
    catch (err: any) {
        return response.status(500).json({
            messaage: err.message
        })
    }
}

export async function addProductsToCartP(request: express.Request, response: express.Response) {
    // const userId = request.query.userId as string
    const userId = request.query.userId as string
    const productId = request.query.productId as string

    try {
        await isEmailVerified(userId)
        await CustomerService.addProductsToCartP(userId, productId,)
        return response.status(200).json({
            message: "Products added to cart successfully",
        })
    }
    catch (err: any) {
        return response.status(500).json({
            messaage: err.message
        })
    }
}

export async function getAllProductsFromCart(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    try {
        await CustomerService.getAllProductsFromCart(userId).then((data) => {
            return response.status(200).json({
                message: "Products found",
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

export async function getProductsById(request: express.Request, response: express.Response) {
    const productId = request.query.productId as string
    try {
        await CustomerService.getProductsById(productId).then((data) => {
            return response.status(200).json({
                message: "Product fetched successfully",
                Product: data
            })
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function getProductsFromWishlist(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    try {
        await CustomerService.getAllProductsFromWishlist(userId).then((data) => {
            return response.status(200).json({
                message: "Wishlist fetched succesfully!",
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

export async function deleteProductsFromCart(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const productId = request.query.productId as string
    try {
        await isEmailVerified(userId)
        await CustomerService.removeProductsToCart(userId, productId)
        return response.status(200).json({
            message: "Products removed from cart successfully"
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function getCartByUserId(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    try {
        await CustomerService.getCartByUserId(userId).then((data) => {
            return response.status(200).json({
                message: "Cart fetched successfully",
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

export async function addProductsToWishlist(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const productId = request.query.productId as string
    try {
        await isEmailVerified(userId)
        await CustomerService.addProductsToWishlist(userId, productId)
        return response.status(200).json({
            message: "Product added to wishlist successfully"
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function addProductsToWishlistP(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const productId = request.query.productId as string
    try {
        await isEmailVerified(userId)
        const p = await CustomerService.addProductsToWishlistP(userId, productId).then(data => { return data })
        return response.status(200).json({
            message: "Product added to wishlist successfully",
            Wishlist: p
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function deleteProductsFromWishlist(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const productId = request.query.productId as string
    try {
        await isEmailVerified(userId)
        await CustomerService.deleteProductsFromWishlist(userId, productId)
        return response.status(200).json({
            message: "Product removed from wishlist successfully"
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function deleteProductsFromWishlistP(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const productId = request.query.productId as string
    try {
        await isEmailVerified(userId)
        await CustomerService.removeProductsToWishlistP(userId, productId)
        return response.status(200).json({
            message: "Products removed from wishlist successfully"
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function makeOrder(request: express.Request, response: express.Response) {
    const cartId = request.query.cartId as string
    const userId = request.query.userId as string
    try {
        await isEmailVerified(userId)
        await CustomerService.makeOrder(userId, cartId)

        return response.status(200).json({
            message: "Order made successfully"
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function makeOrder1(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    try {
        await isEmailVerified(userId)
        await CustomerService.makeOrder1(userId)
        return response.status(200).json({
            message: "Order made successfully"
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function deleteOrder(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const orderId = request.query.orderId as string
    try {
        await isEmailVerified(userId)
        await CustomerService.deleteOrder(userId, orderId)
        return response.status(200).json({
            message: "Order deleted successfully!"
        })
    }
    catch (err: any) {
        return response.status(500).json({
            message: err.message
        })
    }
}

export async function makePayment(request: express.Request, response: express.Response) {
    const orderId = request.query.orderId as string
    const { email, name } = request.body
    try {
        await CustomerService.makePayment(orderId, email, name).then((data) => {
            return response.status(200).json({
                message: "Payment made successfully",
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
export async function makePayment1(request: express.Request, response: express.Response) {
    const orderId = request.query.orderId as string
    const { email, name } = request.body
    try {
        await CustomerService.makePayment(orderId, email, name).then((data) => {
            return response.status(200).json({
                message: "Payment made successfully",
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

export async function checkout(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const cartId = request.query.cartId as string
    try {
        await CustomerService.makeOrder2(userId, cartId).then((data) => {
            return response.status(200).json({
                message: "Payment made successfully",
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

export async function checkout1(request: express.Request, response: express.Response) {
    const userId = request.query.userId as string
    const cartId = request.query.cartId as string
    try {
        await CustomerService.makeOrder3(userId, cartId).then((data) => {
            return response.status(200).json({
                message: "Payment made successfully",
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

export async function verifyPayment(request: express.Request, response: express.Response) {
    const orderId = request.query.orderId as string
    try {
        await CustomerService.verifyPayment(orderId).then((data) => {
            return response.status(200).json({
                message: "Payment verified successfully",
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

export async function searchProduct(request: express.Request, response: express.Response) {
    const search = request.query.search as string
    try {
        const products = await CustomerService.searchProducts(search)
        if (products.length === 0) {
            return response.status(404).json({
                message: "Products not found"
            })
        }
        return response.status(200).json({
            message: "Products found",
            products: products
        })
    }
    catch (err: any) {
        return response.status(500).json({ message: err.message })
    }
}

export async function getProductsCategory(request: express.Request, response: express.Response) {
    const category = request.query.category as string
    try {
        const products = await CustomerService.getProductsFromCategory(category)
        if (products.length === 0) {
            return response.status(404).json({
                message: "Products not found"
            })
        }
        return response.status(200).json({
            message: "Products found",
            products: products
        })
    }
    catch (err: any) {
        return response.status(500).json({ message: err.message })
    }
}