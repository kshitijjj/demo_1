// routes/productRoute.js
import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  removeProduct
} from '../controllers/productController.js';

const router = express.Router();

// these are the routes you will add cacheMiddleware to
router.get('/', verifyToken, getProducts);
router.get('/:id', verifyToken, getProduct);

// these routes change data — you will add deleteCache here
router.post('/', verifyToken, addProduct);
router.put('/:id', verifyToken, editProduct);
router.delete('/:id', verifyToken, removeProduct);

export default router;