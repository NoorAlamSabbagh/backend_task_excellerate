import express from 'express';
import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes';
import dependency from "./config/dependency";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/assets',express.static('src/public'));

// Middleware
app.use(express.json());

app.use(cors({
  origin  : '*',
  exposedHeaders: process.env.CORS_HEADERS ? process.env.CORS_HEADERS.split(",") : '*',
  methods : ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'key' ,'Authorization' ,'authorization', 'authToken']
}));

dependency(app);

// Start the server
app.listen((PORT), () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});