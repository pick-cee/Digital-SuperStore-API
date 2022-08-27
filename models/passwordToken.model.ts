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
            type: mongoose.Schema.Types.Date,
            default: new Date().setTime(new Date().getTime() + 1140000)
        },
    },
    { timestamps: true }
);

export default mongoose.model("passwordToken", passTokenSchema);