import User from "../models/user.js";
import bcrypt from "bcrypt";
import * as auth from "../auth.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

export async function registerUser(body) {
    const user = await (new User({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    })).save();
    user.password = "";
    return user;
}

export async function loginUser(body) {
    const result = await (User.findOne({email: body.email}));
    if (!result) return {error: "Not found"};

    return bcrypt.compareSync(body.password, result.password) ? {
        access: auth.createAccessToken(result)
    } : {error: "Invalid password"};
}

export async function getProfile(body) {
    const result = await User.findById(body.id);
    if (!result) return {error: "Not found"};
    result.password = "";

    return result;
}

export async function checkout(user, body) {
    if (!body.products) throw "Invalid Request";
    let containedProducts = [];
    for (const i in body.products) {
        const productInfo = body.products[i];
        const product = await Product.findById(productInfo.id);
        product.stock -= productInfo.quantity;
        await Product.findByIdAndUpdate(productInfo.id, {stock: product.stock});
        containedProducts.push({
            productId: productInfo.id,
            quantity: productInfo.quantity,
        })
    }
    return await (new Order({
        userId: user._id,
        products: containedProducts,
    })).save()
}

export async function getAllOrders() {
    return Order.find();
}

export async function getMyOrders(user_id) {
    return Order.find({userId: user_id});
}

export async function setAdmin(user_id, admin_status = true) {
    return User.findByIdAndUpdate(user_id, {isAdmin: admin_status});
}