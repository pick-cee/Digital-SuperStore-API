import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    cartId: {
        type: mongoose.Types.ObjectId
    },
    status: {
        type: String,
        default: "pending..."
    },
    transactionId: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model("Order", orderSchema)