import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';

const {
MONGO_HOST,
MONGO_USERNAME,
MONGO_PASSWORD,
MONGO_PORT,
MONGO_DBNAME,
MONGO_LOCAL,
} = process.env;

let MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}?authSource=admin`;

if (MONGO_LOCAL === 'true') {
MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
}

console.info('MONGO_URI', MONGO_URI);

// Connect to the MongoDB database
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB', error);
    });