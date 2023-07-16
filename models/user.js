import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String, required: [true, "Email is required"]
    },
    password: {
        type: String, required: [true, "Password is required"]
    },
    isAdmin: {
        type: Boolean, default: false
    },
    cart: [{
        productId: {
            type: String, required: [true, "Product ID is required"]
        },
        quantity: {
            type: Number, default: 1
        }
    }],
})

export default mongoose.model("User", userSchema);
