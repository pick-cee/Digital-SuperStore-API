import mongoose from "mongoose";
const passTokenSchema = new mongoose.Schema(
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
            type: Date.now(),
            default: new Date().setTime(new Date().getTime() + 11400000)
        },
    },
    { timestamps: true }
);

export default mongoose.model("passwordToken", passTokenSchema);