import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    cartId: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
    status: {
        type: String,
        default: "pending..."
    },
    transactionId: {
        type: mongoose.Types.ObjectId,
        ref: "Transaction"
    },
    amount: {
        type: Number,
        required: true
    },
    paymentReference: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model("Order", orderSchema)