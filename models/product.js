import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "Product name is required"]
    },
    description: {
        type: String, required: [true, "Product description is required"]
    },
    stock: {
        type: Number, required: [true, "Product stock amount is required"]
    },
    isActive: {
        type: Boolean, default: true
    },
    createdOn: {
        type: Date, default: new Date()
    },
})

export default mongoose.model("Product", productSchema);
