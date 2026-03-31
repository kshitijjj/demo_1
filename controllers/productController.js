// controllers/productController.js
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productService.js';

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    return res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    return res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const result = await deleteProduct(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};