import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import 'dotenv/config';
import { SESSION_SECRET } from '../config';
import Routes from './routes/mapped-routes';
import reportRouter from './routes/report-routes';


const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const app = express();

const PORT = 8080;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT_PATH));
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use('/routes', Route);
app.use('/reports', reportRouter);


// Render All Pages
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

//Listening
app.listen(PORT, () =>
  console.log(`App now listening for requests at: http://localhost:${PORT}`)
);
