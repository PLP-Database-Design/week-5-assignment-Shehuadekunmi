const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const dotenv = require('dotenv')
// const db = require('./config/db')
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();


const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);


db.connect((err) => {
    if (err) return console.log('Error connection to the database');   

    console.log('connected to my mysql successfull as id:', db.threadId);


    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/patient', (req, res) => {
        db.query('SELECT * FROM patients', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving patients ')
                
            } else {
                res.render('patient', {results: results});
            }
        })
    })

    app.get('/provider', (req,res) => {
        db.query('SELECT * FROM providers', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving provider')
                
            } else {
                res.render('provider', {results: results});
            }
        })
    })

    app.get('/firstname', (req, res) => {
        db.query('SELECT first_name FROM patients', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving first name')
                
            } else {
                res.render('firstname', {results: results});
            }
        })
    });

    app.get('/specialty', (req, res) => {
        db.query('SELECT provider_specialty FROM providers', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving provider specialty')
                
            } else {
                res.render('specialty', {results: results})
            }
        })
    })

    app.listen(process.env.PORT, () => {
        console.log(`server running on port: ${process.env.PORT}`);
        
    })

    console.log('Sending message to browser...');
    app.get('/', (req, res) => {
        res.send('Server started successfully')
    })
    
    
}) 
