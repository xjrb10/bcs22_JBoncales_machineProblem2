import User from "./models/user.js";
import jwt from "jsonwebtoken";

const secret = 'bcsAN22';

export function createAccessToken(user) {
    return jwt.sign({
        id: user._id,
    }, secret);
}

export async function authenticateToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, decoded) => {
            if (err) return reject("Invalid Token");
            resolve(decoded);
        })
    });
}

export async function authenticateHeaders(req) {
    const token = req.headers.authorization;
    if (!token) throw "Unauthorized";
    const [authScheme, authString] = token.split(" ");
    if (authScheme !== "Bearer") throw "Unsupported Authorization scheme";
    const data = await authenticateToken(authString);
    req.user_id = data.id;
    return data;
}

export async function isAdmin(req) {
    await authenticateHeaders(req);
    const user = await User.findById(req.user_id);
    return user.isAdmin;
}