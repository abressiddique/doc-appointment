import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const dbUrl = process.env.MONGODB_URL

const connectDB = async()=>{
    await mongoose.connect(`${dbUrl}/prescripto`)
}

export default connectDB;