import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String, required: [true, "User ID is required"]
    },
    products: [{
        productId: {
            type: String, required: [true, "Product ID is required"]
        },
        quantity: {
            type: Number, default: 1
        }
    }],
    // total amount should just be inferred from the sum of all product quantities
    purchasedOn: {
        type: Date, default: new Date()
    },
})

export default mongoose.model("Order", orderSchema);
