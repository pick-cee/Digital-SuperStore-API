import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
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
            amount: {
                type: Number,
            },
            image: {
                type: String
            }
        },
    ],
}, { timestamps: true })

export default mongoose.model("Wishlist", wishlistSchema)