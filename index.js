import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import indexRoutes from './routes/indexRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use("/api", indexRoutes);

app.listen(PORT, () => {
    console.log("✅ Server running on port: ", PORT);
})