import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import 'dotenv/config';
import { SESSION_SECRET } from '../config';

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const app = express();

const PORT = 8080;

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(CLIENT_PATH));

app.use(session({ secret: SESSION_SECRET , resave: false, saveUninitialized: false }));

app.use(passport.initialize());

app.use(passport.session());

//Listening

app.listen(PORT, () => console.log(`App now listening for requests at: http://localhost:${PORT}`));

