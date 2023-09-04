import dotenv from 'dotenv';
dotenv.config()

import mongoose from 'mongoose';

export const mongoConnect = async () => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
}

export const mongoDisconnect = async () => {
    await mongoose.disconnect()
}
