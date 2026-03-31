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
import { cacheMiddleware } from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// these are the routes you will add cacheMiddleware to
router.get('/', verifyToken,cacheMiddleware(60), getProducts);
router.get('/:id', verifyToken,cacheMiddleware(30), getProduct);

// these routes change data — you will add deleteCache here
router.post('/', verifyToken, addProduct);
router.put('/:id', verifyToken, editProduct);
router.delete('/:id', verifyToken, removeProduct);

export default router;