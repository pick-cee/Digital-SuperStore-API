import { Types, Schema, model } from "mongoose"
import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    orders: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    wishlist: {
        type: Schema.Types.ObjectId,
        ref: "Wishlist"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }
}, { timestamps: true })

export default mongoose.model('Customer', customerSchema)