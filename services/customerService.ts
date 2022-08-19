import customerModel from "../models/customer.model";
import wishlistModel from "../models/wishlist.model";
import productModel from '../models/product.model'
import cartModel from "../models/cart.model";
import baseService from "./baseService";

const BaseService = new baseService()

class customerService extends baseService {
    #product: any

    async getProducts() {
        this.#product = await productModel.find().exec()

        return this.#product
    }

    async addProductsToCart(userId: any, productId: any) {
        const cartExists = await cartModel.findOne({ userId, productId }).exec()
        const product = await productModel.findOne({ productId }).exec()
        
        if (cartExists) {
            throw new Error("Product already exists in cart")
        }
        if (!product) {
            throw new Error("Product does not exist")
        }
        const cart = new cartModel({
            userId: userId,
            productId: productId,
        })
        console.log(cart)
        await cart?.save()
        return cart
    }

    async removeProductsToCart(userId: any, productId: any) {
        const cartExists = await cartModel.findOne({ userId, productId })
        if (!cartExists) {
            throw new Error("Product does not exists in cart")
        }
        const cart = await cartModel.findOneAndDelete({ userId, productId })
        await cart?.save()
        return
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
        const wishlistExists = await wishlistModel.findOne({ userId, productId })
        if (!wishlistExists) {
            throw new Error("Product does not exists in wishlist")
        }
        const wishlist = await wishlistModel.findOneAndDelete({ userId, productId })
        await wishlist?.save()
        return
    }

    async makePayment() {

    }
}

export default customerService