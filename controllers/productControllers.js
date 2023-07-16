import Product from "../models/product.js";

export async function createProduct(body) {
    return await (new Product({
        name: body.name,
        description: body.description,
        stock: body.stock
    })).save();
}

export async function allProducts(filter = undefined) {
    return Product.find(filter);
}

export async function allActiveProducts(body) {
    return Product.find({isActive: true});
}

export async function getProduct(id) {
    return Product.findById(id);
}

export async function updateProduct(id, newDetails) {
    return Product.findByIdAndUpdate(id, newDetails);
}

export async function archiveProduct(id) {
    return Product.findByIdAndUpdate(id, {isActive: false});
}
