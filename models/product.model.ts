import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        enum: ["Clothing", "Electronics", "Groceries", "Footwear", "Wristwatch", "Phone accessories"],
    },
    image: {
        type: String, // change to object
        required: false
    }
}, { timestamps: true })

export default mongoose.model("Product", productSchema)