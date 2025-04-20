import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

dotenv.config();

//This code will get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting view engine to EJS
app.set('view engine', 'ejs');

// Setting up the views directory for ejs 
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.use(authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});