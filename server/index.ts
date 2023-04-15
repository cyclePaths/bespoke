const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv');
// const { SESSION_SECRET } = require('../config.ts');

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const app = express();

const PORT = 8080;

//Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(CLIENT_PATH));

app.use(session({ secret: 'secret-tunnel', resave: false, saveUninitialized: false }));

app.use(passport.initialize());

app.use(passport.session());

//Listening

app.listen(PORT, () => console.log(`App now listening for requests at: http://localhost:${PORT}`));

