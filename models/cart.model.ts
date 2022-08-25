import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            name: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            },
            amount: {
                type: Number,
            },
            image: {
                type: String
            }
        },
    ],
}, { timestamps: true })

export default mongoose.model("Cart", cartSchema)