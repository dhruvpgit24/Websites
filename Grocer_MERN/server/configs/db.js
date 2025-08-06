import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', ()=> console.log('database connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/Grocer`)
  } catch (error) {
    console.log("Mongodb Connection Error", error.message);
  }
};

export default connectDB