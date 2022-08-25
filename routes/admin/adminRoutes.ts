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
router.get('/getUsers', getUsers)
router.post('/createProduct', formidable(), createProduct)
router.get('/getProduct', getAllProducts)
router.delete('/deleteProduct', deleteProduct)
router.put('/updateProduct', formidable(), updateProduct)
router.get('/getUserStats', getUserStats)
router.get('/getAllUserStats', getAllUserStats)

export default router 