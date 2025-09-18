import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(cors());

// CONNECT DB
connectDB();

//MIDDLEWARE
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/resume', resumeRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, _path) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  }
}))

// ROUTES
app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
