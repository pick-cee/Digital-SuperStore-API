import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Wishlist", wishlistSchema)