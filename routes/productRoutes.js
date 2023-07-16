import express from "express";
import {
	allActiveProducts,
	allProducts, archiveProduct,
	createProduct,
	getProduct,
	updateProduct
} from "../controllers/productControllers.js";
import {isAdmin} from "../auth.js";


const router = express.Router();

router.get('/', async (req, res) => {
	res.json(await allProducts(req.body))
})
router.get('/all-active', async (req, res) => {
	res.json(await allActiveProducts(req.body))
})
router.get('/:id', async (req, res) => {
	console.log(req.params.id)
	res.json(await getProduct(req.params.id))
})

// create product
router.post('/', async (req, res) => {
	if (!await isAdmin(req)) return res.status(403).json({error: "Forbidden"});
	res.json(await createProduct(req.body))
});
// update product
router.put('/:id', async (req, res) => {
	if (!await isAdmin(req)) return res.status(403).json({error: "Forbidden"});
	res.json(await updateProduct(req.params.id, req.body))
});
// archive product
router.put('/:id/archive', async (req, res) => {
	if (!await isAdmin(req)) return res.status(403).json({error: "Forbidden"});
	res.json(await archiveProduct(req.params.id))
})

export default router;