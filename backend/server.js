const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("API is running...");
})

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));