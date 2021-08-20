const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
dotenv.config({path: 'debug./.env'})

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML form)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by API client)
app.use(express.json());
app.set('view engine', 'hbs');

db.connect((err)=>{
    if(err){
        console.log('Database not connected');
    }else{
        console.log('Database connected....');
    }
});
//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});