import express from "express"

import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"
import authRouter from "./router/auth.routes"
import clothsRouter from "./router/cloths.routes"
import feedbackRouter from "./router/feedback.routes"
import ordersRouter from "./router/orders.routes"

import cors from "cors"

dotenv.config()

const SERVER_PORT = Number(process.env.SERVER_PORT) || 5000

const MONGO_URI = process.env.MONGO_URI as string 

const app = express()

app.use(express.json())

const corsOptions = {
  origin: "https://coths-shop.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false
}

app.use(cors(corsOptions))

app.use("/api/v1/auth" , authRouter)
app.use("/api/v1/cloths" , clothsRouter)
app.use("/api/v1/feedback" , feedbackRouter)
app.use("/api/v1/orders" , ordersRouter)



mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected Successful")
  })
  .catch((err) => {
    console.error(`DB connection fail: ${err}`)
    process.exit(1)
  })


app.listen(SERVER_PORT,()=>{
    console.log(`Server is running on port ${SERVER_PORT}`)
})