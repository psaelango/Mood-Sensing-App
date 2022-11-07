const mongoose = require('mongoose')
const Moods = require('../models/moods.model');

const connectDB = async () => {
  try {
    // console.log('Process env = ', process.env);
    const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    // const conn = await mongoose.connect( 'mongodb://127.0.0.1:27017/moodsenseapp', { useNewUrlParser: true })
    Moods.listIndexes().then(indexes => console.log('indexes = ', indexes));

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
