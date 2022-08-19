import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Cart", cartSchema)