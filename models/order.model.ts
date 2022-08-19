import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId
            },
            quantity: {
                type: Number,
                default: 1
            },
            required: true
        },
    ],
    transactionId: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model("Order", orderSchema)