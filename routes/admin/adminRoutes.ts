import express from 'express'
import {
    createProduct, deleteProduct, getAllProducts, getAllUserStats, getUsers,
    getUserStats, loginAdmin, Register, updateProduct
} from '../../controllers/admin/admin.controller'
import formidable from 'express-formidable'
import verifyToken from '../../middlewares/verifyUserToken'

const router = express.Router()

router.post('/createAdmin', Register)
router.post('/loginAdmin', loginAdmin)
router.get('/getUsers', verifyToken, getUsers)
router.post('/createProduct', verifyToken, formidable(), createProduct)
router.get('/getProduct', verifyToken, getAllProducts)
router.delete('/deleteProduct', verifyToken, deleteProduct)
router.put('/updateProduct', verifyToken, formidable(), updateProduct)
router.get('/getUserStats', verifyToken, getUserStats)
router.get('/getAllUserStats', getAllUserStats)

export default router 