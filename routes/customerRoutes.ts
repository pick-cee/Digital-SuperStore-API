import express from 'express'
import {
    forgotPassword, getByEmail, getById,
    loginCustomer, registerCustomer, resendToken, resetPassword, verifyEmail,
    addProductsToCart, deleteProductsFromCart, addProductsToWishlist,
    deleteProductsFromWishlist, makeOrder, deleteOrder,
    makePayment, verifyPayment, searchProduct, getProductsCategory, addProductsToCartP,
    getAllProductsFromCart, getProductsFromWishlist
} from '../controllers/customer.controller'
import verifyToken from '../middlewares/verifyUserToken'

const router = express.Router()

router.post('/login', loginCustomer)
router.post('/register', registerCustomer)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.get('/getByEmail', getByEmail)
router.get('/getById/:id', getById)
router.post('/verifyEmail', verifyEmail)
router.post('/resendToken', resendToken)
router.post('/addProductsToCart', verifyToken, addProductsToCart)
router.post('/addProductsToCartP', verifyToken, addProductsToCartP)
router.get('/getProductsFromCart', verifyToken, getAllProductsFromCart)
router.get('/getProductsFromWishlist', verifyToken, getProductsFromWishlist)
router.delete('/removeProductsFromCart', verifyToken, deleteProductsFromCart)
router.post('/addProductsToWishlist', verifyToken, addProductsToWishlist)
router.delete('/removeProductsFromWishlist', verifyToken, deleteProductsFromWishlist)
router.post('/makeOrder', verifyToken, makeOrder)
router.delete('/deleteOrder', verifyToken, deleteOrder)
router.post('/makePayment', verifyToken, makePayment)
router.get('/verifypayment', verifyToken, verifyPayment)
router.get('/search', searchProduct)
router.get('/searchCategory', getProductsCategory)
export default router