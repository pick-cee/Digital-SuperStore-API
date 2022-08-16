import express from 'express'
import { loginCustomer } from '../controllers/customer.controller'

const router = express.Router()

router.post('/login', loginCustomer)

export default router