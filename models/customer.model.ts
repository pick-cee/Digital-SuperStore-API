import { Types, Schema, model } from "mongoose"

interface ICustomer  {
    name: string,
    email: string,
    password: string,
    orders: Types.ObjectId,
    wishlist: Types.ObjectId,
    cart: Types.ObjectId
}

const customerSchema = new Schema<ICustomer>({
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
}, {timestamps: true})

export default model<ICustomer>('Customer', customerSchema)