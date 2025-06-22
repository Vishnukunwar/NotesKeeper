const express = require('express');
const dotenv = require('dotenv');
const notes = require('./data/notes');
const connectDB = require('./config/db')
const userRouters = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello World');
});

app.get('/notes', (req, res)=>{
    res.json(notes);
});

app.use('/users', userRouters);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));