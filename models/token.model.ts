import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
        expiresIn: {
            type: mongoose.Schema.Types.Date,
            default: Date.now() + 1140000
        },
    },
    { timestamps: true }
);

export default mongoose.model("token", tokenSchema);