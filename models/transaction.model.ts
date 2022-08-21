import mongoose from 'mongoose'
const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    orderId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Order"
    }
}, { timestamps: true })

export default mongoose.model("Transaction", transactionSchema)