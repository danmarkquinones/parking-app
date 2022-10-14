import mongoose from 'mongoose'

const connectMongo = async () => {
    console.log("MONGO URL",process.env.DB_URI)
    mongoose.connect(
        process.env.DB_URI
    )
}

export default connectMongo;