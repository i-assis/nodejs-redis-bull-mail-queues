import 'dotenv/config'; // LEVEL 0
import express from 'express'; // CORE LEVEL 0
import UserController from './app/controllers/UserController'; // CORE LEVEL 1

// CORE LEVEL 0
const app = express();

// CORE LEVEL 1 - ROUTES
app.use(express.json());
app.post('/users', UserController.store);


// CORE LEVEL 0
const port = 3333;
app.listen(port, () => console.log('Server running on localhost:3333...') )