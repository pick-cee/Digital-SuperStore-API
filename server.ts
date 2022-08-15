import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'


dotenv.config()
const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/", (request, response) => {
    response.json({ message: "Welocome to the Digital Superstore!"})
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})