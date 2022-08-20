import customerModel from "../models/customer.model";
import wishlistModel from "../models/wishlist.model";
import productModel from '../models/product.model'
import cartModel from "../models/cart.model";
import orderModel from "../models/order.model"
import baseService from "./baseService";
import { AnyARecord } from "dns";

const BaseService = new baseService()

class customerService extends baseService {
    #product: any

    async getProducts() {
        this.#product = await productModel.find().exec()

        return this.#product
    }


    // Author: Effi Emmanuel
    async addProductsToCart(userId: any, productId: any, quantity: any) {
        const cart = await cartModel.findOne({ userId })
        if (!cart) {
            // Create a new cart document
            const newCartDoc = new cartModel({
                userId,
                products: [{
                    productId,
                    quantity
                }]
            })

            // Save document
            await newCartDoc.save()
            return
        } else {
            console.log('Cart:', cart)
        }

        // Check if product exists
        const product = await productModel.findById(productId)
        if (!product) {
            throw new Error('Product is not available');
        } else {
            console.log('Cart:', product)
        }

        // New product object
        const newProductToCart: any = {
            productId: product._id,
            quantity: quantity
        }

        // adding new product to cart and saving the document
        cart.products.push(newProductToCart)
        cart?.save()

        return
    }

    // Author: Effi Emmanuel
    async removeProductsToCart(userId: any, productId: any) {
        const cart = await cartModel.findOne({ userId }).exec()

        if (!cart) throw new Error('Invalid action. Cart is empty!');


        let notInCart: Boolean = true

        cart?.products.forEach((product, index) => {
            if (product.productId == productId) {
                notInCart = false
                cart.products.splice(index, 1)
                cart.save()
                return
            }
        })

        if (notInCart) throw new Error('Invalid action. Product is not in your cart!')
    }

    async addProductsToWishlist(userId: any, productId: any) {
        const wishlistExists = await wishlistModel.findOne({ userId, productId })
        const product = await productModel.findOne({ productId }).exec()

        if (wishlistExists) {
            throw new Error("Product already exists in wishlist")
        }
        if (!product) {
            throw new Error("Product does not exist")
        }
        const wishlist = new wishlistModel({
            userId: userId,
            productId: productId
        })
        await wishlist.save()
        return
    }
    async deleteProductsFromWishlist(userId: any, productId: any) {
        const wishlistExists = await wishlistModel.findOne({ userId, productId }).exec()
        if (!wishlistExists) {
            throw new Error("Product does not exists in wishlist")
        }
        await wishlistModel.findOneAndDelete({ userId, productId }).exec()
        return
    }

    async makeOrder(userId: any, cartId: any) {
        const user = await customerModel.findOne({ userId }).exec()
        const cart = await cartModel.findOne({ cartId }).exec()
        if (!user) {
            throw new Error("User does not exist")
        }
        if (!cart) {
            throw new Error("Please add products to cart before making an order")
        }
        const order = new orderModel({
            userId: userId,
            cartId: cartId
        })
        await order.save()
        await cartModel.findByIdAndDelete({ _id: cartId }).exec()
        return
    }

    async deleteOrder(userId: any, orderId: any) {
        const user = await customerModel.findOne({ userId }).exec()
        const order = await orderModel.findOne({ orderId }).exec()
        if (!user) {
            throw new Error("User does not exist")
        }
        if (!order) {
            throw new Error("Order does not exists!")
        }
        await orderModel.findByIdAndDelete({ _id: orderId }).exec()
        return
    }

    async makePayment() {

    }
}

export default customerService