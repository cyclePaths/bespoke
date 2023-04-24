import path from 'path';
import express from 'express';
import session from 'express-session';
// import pg from 'pg';
// import PgSimpleStore from 'connect-pg-simple';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import 'dotenv/config';
import { SESSION_SECRET } from '../config';
import BikeRoutes from './routes/mapped-routes';
import { WeatherRoute } from './routes/weather-routes';
import reportRouter from './routes/report-routes';
import profileRouter from './routes/profile-route';
import { bulletinRouter, commentRouter } from './routes/bulletinboard-routes';

interface User {
  id: number;
  email: string;
  name: string;
  thumbnail: string;
  weight: number;
  // favAddresses?: string[];
  location_lat?: number;
  location_lng?: number;
  // favAddresses?: number[] | undefined;
}

/// The commented out parts are for storing a session to be found later ///
// const pgPool = new pg.Pool({
//   connectionString: 'postgresql://postgres:GHexpert12!@localhost:5432/bespoke',
// });

// const pgSessionStore = new PgSimpleStore({
//   pool: pgPool,
//   tableName: 'session',
// });

//Authentication Imports
import '../auth';
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
//

const app = express();

//  Authentication Middleware
app.use(
  session({
    secret: SESSION_SECRET,
    // store: pgSessionStore, // This is for creating a session in the db to be referenced later if the server stops
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    rolling: true,
  })
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

// 7. Provides user context to every part of the client
app.get('/auth/user', (req, res) => {
  // const user = req.user;
  const user = req.user as User;
  prisma.user
    .findFirst({
      where: { id: user.id },
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

// Middleware
const CLIENT_PATH = path.resolve(__dirname, '../client/dist/');
app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 8080;

//routes from individual files
app.use('/weather', WeatherRoute);

// Routes to be used
app.use('/bikeRoutes', BikeRoutes);
app.use('/createReport', reportRouter);
app.use('/profile', profileRouter);
app.use('/bulletin', bulletinRouter);
app.use('/comment', commentRouter);
app.use('/reports', reportRouter);



// Render All Pages
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

// UPDATE USER
interface UpdateUserData extends User {
  location_lat?: number;
  location_lng?: number;
  // favAddresses?: string[];
}

app.put('/home/user/:id', async (req, res) => {
  console.log('index.ts attempting put');
  const { id } = req.params;
  console.log(req.params);
  const { location_lat, location_lng } = req.body!; // extract the updated data from the request body
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) }, // use the ID of the authenticated user
      data: { location_lat, location_lng } as UpdateUserData,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user data' });
  }
});

//Listening
app.listen(PORT, () =>
  console.log(`App now listening for requests at: http://localhost:${PORT}`)
);
