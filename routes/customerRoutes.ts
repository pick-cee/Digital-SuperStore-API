import express from 'express'
import {
    forgotPassword, getByEmail, getById,
    loginCustomer, registerCustomer, resendToken, resetPassword, verifyEmail,
    addProductsToCart, deleteProductsFromCart, addProductsToWishlist,
    deleteProductsFromWishlist, makeOrder, deleteOrder, makePayment, verifyPayment, searchProduct, getProductsCategory
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
router.post('/addProductsToCart', addProductsToCart)
router.delete('/removeProductsFromCart', deleteProductsFromCart)
router.post('/addProductsToWishlist', addProductsToWishlist)
router.delete('/removeProductsFromWishlist', deleteProductsFromWishlist)
router.post('/makeOrder', makeOrder)
router.delete('/deleteOrder', deleteOrder)
router.post('/makePayment', makePayment)
router.get('/verifypayment', verifyPayment)
router.get('/search', searchProduct)
router.get('/searchCategory', getProductsCategory)
export default router