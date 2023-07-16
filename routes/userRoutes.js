import {
	checkout,
	getAllOrders,
	getMyOrders,
	getProfile,
	loginUser,
	registerUser, setAdmin
} from "../controllers/userControllers.js";
import express from "express";
import {authenticateHeaders, isAdmin} from "../auth.js";
import User from "../models/user.js";

const router = express.Router();


router.post('/register', async (req, res) => {
	res.json(await registerUser(req.body))
});
router.post('/login', async (req, res) => {
	res.json(await loginUser(req.body))
});
router.get('/:id/details', async (req, res) => {
	res.json(await getProfile(req.params.id))
});


router.post('/checkout', async (req, res) => {
	await authenticateHeaders(req);
	res.json(await checkout(await User.findById(req.user_id), req.body))
});

router.get('/orders', async (req, res) => {
	if (!await isAdmin(req)) return res.status(403).json({error: "Forbidden"});
	res.json(await getAllOrders())
});

router.get('/myOrders', async (req, res) => {
	await authenticateHeaders(req);
	res.json(await getMyOrders(req.user_id))
});

router.put('/:id/setAsAdmin', async (req, res) => {
	if (!await isAdmin(req)) return res.status(403).json({error: "Forbidden"});
	res.json(await setAdmin(req.params.id, req.body.status || true))
});


export default router;