const express = require('express');
const dotenv = require('dotenv');
const notes = require('./data/notes');

const app = express();
dotenv.config();

app.get('/', (req, res)=>{
    res.send('Hello World');
});

app.get('/notes', (req, res)=>{
    res.json(notes);
});

app.get('/notes/:id', (req, res)=>{
    const note = notes.find((item)=> item._id === req.params.id);
    res.json(note);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));