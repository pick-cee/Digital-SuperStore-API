import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import customerRoutes from './routes/customerRoutes'
import adminRoutes from './routes/admin/adminRoutes'

dotenv.config()
const port = process.env.PORT

const connect = async () => {
    process.env.NODE_ENV === 'development' ?
        await mongoose.connect(`${process.env.MONGODB_URI}`)
            .then(() => { console.log("Local Db connected successfully!"), { useNewUrlParser: true } })
            .catch(err => { console.log(err) })
        : await mongoose.connect(`${process.env.MONGODB_URI_CLOUD}`)
            .then(() => { console.log("Cluster Db connected successfully!") })
            .catch(err => { console.log(err) })
}

connect();

const app = express()
app.set("trust proxy", true)
app.use(express.json({ limit: '6mb' }))
app.use(express.urlencoded({ limit: '6mb', extended: true, parameterLimit: 6000 }))
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