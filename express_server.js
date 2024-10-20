const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const postRouter = require('./routes/postRoutes');
require('dotenv').config();



const app = express();
app.use(express.urlencoded());
app.use(express.static('public'));
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
    console.log('Connected to DB');
    app.listen(8080, () => console.log('Server running at http://localhost:8080/'));
    })
    .catch((err)=>console.log('Error connecting to DB:' + err));

app.get('/index', (req, res) => {
    console.log(`new request: ${req.url}`);
    res.sendFile(path.join(app.get('views'), "index.html"))
})

app.use('/posts', postRouter);

app.use((req, res) => {
    res.redirect('/posts/');
});
