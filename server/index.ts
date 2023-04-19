import path from 'path';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config';
import { SESSION_SECRET } from '../config';
import BikeRoutes from './routes/mapped-routes';
import reportRouter from './routes/report-routes';
//Authentication Imports
import '../auth';
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
//

const app = express();

//  Authentication Middleware
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

//  Authentication Routes
// 1. Sign-In Splash
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Sign in with Google</div>');
});

// 2. Google endpoint
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// 3. Callback endpoint
app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

// 4. Login Failure Route:
app.get('/auth/failure', (req, res) => {
  res.send('Unable to sign in!');
});

// 5. Login Success Route:
app.get('/protected', isLoggedIn, (req, res) => {
  res.redirect('/home');
});

// 6. Logout Route:
app.get('/logout', (req, res) => {
  req.logout(() => {
    if (req.session) {
      req.session.destroy(() => {
        alert('Now logged out');
      });
    }
  });
  res.redirect('/');
});

// Middleware
const CLIENT_PATH = path.resolve(__dirname, '../client/dist/');
app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 8080;

app.use('/routes', BikeRoutes);

// Render All Pages
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

//Listening
app.listen(PORT, () =>
  console.log(`App now listening for requests at: http://localhost:${PORT}`)
);
