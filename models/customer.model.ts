import { Types, Schema, model } from "mongoose"

const customerSchema = new Schema({
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

export default model('Customer', customerSchema)