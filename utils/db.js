import mongoose from "mongoose"

export const connectToDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connect successfully to database")
    } catch (error) {
       console.error("Failed to connect to database", error.message)
       process.exit(1) 
    }
}