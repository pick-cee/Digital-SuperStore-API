import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import customerRoutes from './routes/customerRoutes'
import adminRoutes from './routes/admin/adminRoutes'

dotenv.config()
const port = process.env.PORT

process.env.NODE_ENV === 'development' ?
    mongoose.connect(`${process.env.MONGODB_URI}`)
        .then(() => { console.log("Local Db connected successfully!") })
        .catch(err => { console.log(err) })
    : mongoose.connect(`${process.env.MONGODB_URI_CLOUD}`)
        .then(() => { console.log("Cluster Db connected successfully!") })
        .catch(err => { console.log(err) })

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'))

app.get("/", (request, response) => {
    response.json({ message: "Welocome to the Digital Superstore!" })
})

// customer routes 
app.use('/customer', customerRoutes)

// admin routes
app.use('/admin', adminRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})