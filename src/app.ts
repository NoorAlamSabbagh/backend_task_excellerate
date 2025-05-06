import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import dependency from "./config/dependency";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger/swagger';
import courseRoutes from './controllers/Users/V1/index';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/assets',express.static('src/public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// Middleware
app.use(express.json());

app.use(cors({
  origin  : '*',
  exposedHeaders: process.env.CORS_HEADERS ? process.env.CORS_HEADERS.split(",") : '*',
  methods : ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'key' ,'Authorization' ,'authorization', 'authToken']
}));

dependency(app);


// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.send(`
    <h1>Welcome to Course Management API</h1>
    <p>Visit <a href="/api-docs">API Documentation</a> to explore the endpoints.</p>
  `);
});

// Routes
app.use('/', courseRoutes);
// Start the server
app.listen((PORT), () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});