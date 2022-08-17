import express from 'express'
import {
    forgotPassword, getByEmail, getById,
    loginCustomer, registerCustomer, resendToken, resetPassword, verifyEmail
} from '../controllers/customer.controller'

const router = express.Router()

router.post('/login', loginCustomer)
router.post('/register', registerCustomer)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.get('/getByEmail', getByEmail)
router.get('/getById/:id', getById)
router.post('/verifyEmail', verifyEmail)
router.post('/resendToken', resendToken)
export default router