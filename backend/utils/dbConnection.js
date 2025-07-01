import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo Connection Successful')
    } catch (error) {
        console.log(`Error in connecting to DB ${error}`)
        
    }
}

// module.exports = {
//     connectDb // this is exported like connectDb : {connectDb function}
// }

export default connectDb
