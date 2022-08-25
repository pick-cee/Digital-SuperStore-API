import express from 'express'
import {
    createProduct, deleteProduct, getAllProducts, getAllUserStats, getUsers,
    getUserStats, loginAdmin, Register, updateProduct
} from '../../controllers/admin/admin.controller'
import formidable from 'express-formidable'
import { verifyAdminToken } from '../../middlewares/verifyUserToken'

const router = express.Router()

router.post('/createAdmin', Register)
router.post('/loginAdmin', loginAdmin)
router.get('/getUsers', verifyAdminToken, getUsers)
router.post('/createProduct', verifyAdminToken, formidable(), createProduct)
router.get('/getProduct', getAllProducts)
router.delete('/deleteProduct', verifyAdminToken, deleteProduct)
router.put('/updateProduct', verifyAdminToken, formidable(), updateProduct)
router.get('/getUserStats', verifyAdminToken, getUserStats)
router.get('/getAllUserStats', verifyAdminToken, getAllUserStats)

export default router 