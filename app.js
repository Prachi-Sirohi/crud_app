require('dotenv').config();
const express = require("express");
const mongoose =require("mongoose");
const bodyParser = require("body-parser");
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require("express-session");

const app =express();
const PORT = process.env.PORT ||5000;

//databsae connection
const dbURI = 'mongodb://127.0.0.1:27017/node_crud';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave:false
}));

app.use((req, res, next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));

//set template engine
app.set("view engine", "ejs");

//route prefix
app.use("",require('./routes/routes'));


app.listen(PORT,() =>{
    console.log(`server started at http://localhost:${PORT}`);
});
  