import customerModel from "../models/customer.model";
import wishlistModel from "../models/wishlist.model";
import productModel from '../models/product.model'
import cartModel from "../models/cart.model";
import orderModel from "../models/order.model"
import baseService from "./baseService";
import transactionModel from '../models/transaction.model'
import dotenv from 'dotenv'
dotenv.config()
import randToken from 'rand-token'
import * as paystack from "paystack";
const p = paystack.default(`${process.env.PAYSTACK_SECRET_KEY}`);


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
        const prod = await productModel.findOne({ productId })
        const amount = prod!.price * quantity
        if (!cart) {
            // Create a new cart document
            const newCartDoc = new cartModel({
                userId,
                products: [{
                    productId,
                    quantity,
                    amount
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
        const amount1 = product!.price * quantity
        // New product object
        const newProductToCart: any = {
            productId: product._id,
            quantity: quantity,
            amount: amount1,
        }

        // adding new product to cart and saving the document
        cart.products.push(newProductToCart)
        cart?.save()

        return
    }

    async addProductsToCartP(userId: any, productId: any) {
        const cart = await cartModel.findOne({ userId })
        const prod = await productModel.findOne({ productId })
        const amount = prod!.price
        const image = prod!.image
        const name = prod!.name
        if (!cart) {
            // Create a new cart document
            const newCartDoc = new cartModel({
                userId,
                products: [{
                    productId,
                    quantity: 1,
                    amount,
                    image,
                    name
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
        const amount1 = product!.price
        const image1 = product!.image
        const name1 = product!.name
        // New product object
        const newProductToCart: any = {
            productId: product._id,
            quantity: 1,
            image: image1,
            name: name1,
            amount: amount1,
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

    async getAllProductsFromCart(userId: any) {
        const cart = await cartModel.findOne({ userId }).exec()
        if (!cart) {
            throw new Error("Cart is empty")
        }
        return cart
    }

    async getProductsById(productId: any) {
        const product = await productModel.findById({ _id: productId }).exec()
        if (!product) {
            throw new Error("Product does not exist")
        }
        return product
    }

    async getAllProductsFromWishlist(userId: any) {
        const wishlist = await wishlistModel.find({ userId }).exec()
        if (!wishlist) {
            throw new Error("Wishlist is empty")
        }

        return wishlist
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
        const order1 = await orderModel.findOne({ userId, cartId }).exec()
        const totalAmount = cart?.products.reduce((accumualtor, product: any) => {
            return (accumualtor + (product.amount))
        }, 0)
        if (!user) {
            throw new Error("User does not exist")
        }
        if (!cart) {
            throw new Error("Please add products to cart before making an order")
        }
        if (order1) {
            throw new Error("Order has already been placed")
        }
        const order = new orderModel({
            userId: userId,
            cartId: cartId,
            amount: totalAmount
        })
        await order.save()
        await cartModel.findByIdAndDelete({ _id: cartId }).exec()
        return
    }
    async makeOrder1(userId: any) {
        const user = await customerModel.findOne({ userId }).exec()
        const cart = await cartModel.findOne({ userId }).exec()
        const order1 = await orderModel.findOne({ userId }).exec()
        const totalAmount = cart?.products.reduce((accumualtor, product: any) => {
            return (accumualtor + (product.amount))
        }, 0)
        if (!user) {
            throw new Error("User does not exist")
        }
        if (!cart) {
            throw new Error("Please add products to cart before making an order")
        }
        if (order1) {
            throw new Error("Order has already been placed")
        }
        const order = new orderModel({
            userId: userId,
            cartId: cart._id,
            amount: totalAmount
        })
        await order.save()
        await cartModel.findByIdAndDelete({ _id: cart._id }).exec()
        return
    }

    async getCartByUserId(userId: any) {
        const cart = await cartModel.findOne({ userId }).exec()
        if (!cart) {
            throw new Error("Cart not found")
        }
        return cart
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

    async makePayment(orderId: any, email: any, name: any) {
        const order = await orderModel.findById({ _id: orderId }).exec()
        const user1 = order?.userId
        const user = await customerModel.findOne({ user1 }).exec()
        email = user?.email as any
        name = user?.name as any
        if (!order) {
            throw new Error("Please make an order before proceeding to payment")
        }
        const totalAmount = order.amount * 100
        const ref = randToken.generate(16)
        const init = await p.transaction.initialize({
            key: process.env.PAYSTACK_SECRET_KEY,
            amount: totalAmount,
            email: email,
            name: name,
            reference: ref
        })
        order.paymentReference = ref
        await order.save()
        return init
    }

    async makeOrder2(userId: any, cartId: any) {
        const user = await customerModel.findOne({ userId }).exec()
        const cart = await cartModel.findOne({ cartId }).exec()
        const order1 = await orderModel.findOne({ userId, cartId }).exec()
        const totalAmount = cart?.products.reduce((accumualtor, product: any) => {
            return (accumualtor + (product.amount))
        }, 0)
        if (!user) {
            throw new Error("User does not exist")
        }
        if (!cart) {
            throw new Error("Please add products to cart before making an order")
        }
        if (order1) {
            throw new Error("Order has already been placed")
        }
        const order = new orderModel({
            userId: userId,
            cartId: cartId,
            amount: totalAmount
        })
        await order.save()
        const checkout = await this.makePayment(order._id, user.email, user.name).then((data) => {
            return data
        })
        await cartModel.findByIdAndDelete({ _id: cartId }).exec()
        return { checkout, order }
    }

    async verifyPayment(orderId: any) {
        const order = await orderModel.findById({ _id: orderId }).exec()
        const ref = order?.paymentReference
        if (!ref) {
            throw new Error("Please make your payment first before verifying")
        }
        const verify = await p.transaction.verify(ref)
        if (verify) {
            order.status = "Done!"
            await order.save()
        }
        const transaction = new transactionModel({
            userId: order.userId,
            orderId: orderId
        })
        await transaction.save()

        return
    }
}

export default customerService