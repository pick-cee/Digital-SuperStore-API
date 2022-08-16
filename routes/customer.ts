import express from 'express'
import { createCustomer } from '../services/customerService'
const router = express.Router()

router.post('/', createCustomer)

export default router;