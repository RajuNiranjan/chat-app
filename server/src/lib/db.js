import mongoose from 'mongoose'
import { ENV_VAR } from './env.js'


export const connectDB = async () => {
    try {
        const con = await mongoose.connect(ENV_VAR.DB_URI)
        console.log(`MongoDB connected: ${con.connection.host}`);

    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}