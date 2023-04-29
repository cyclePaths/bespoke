import path from 'path';
import express from 'express';
import { Server } from 'socket.io';
import session from 'express-session';
import PgSimpleStore from 'connect-pg-simple';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import 'dotenv/config';
import { SESSION_SECRET } from '../config';
import BikeRoutes from './routes/mapped-routes';
import { WeatherRoute } from './routes/weather-routes';
import profileRouter from './routes/profile-route';
import dmRouter from './routes/dm-routes';
import LeaderBoard from './routes/leaderboard-routes';
import bulletinRouter from './routes/bulletinboard-routes';
import commentRouter  from './routes/comment-routes';
import equipmentRouter from './routes/equipment-routes';
import { badgeRouter } from './routes/badge-routes';
import reportRouter from './routes/report-routes';



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

const store = new (PgSimpleStore(session))({ createTableIfMissing: true });

//Authentication Imports
import '../auth';
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
//

const app = express();
const io = new Server(8081);
export { io };

//  Authentication Middleware
app.use(
  session({
    secret: SESSION_SECRET,
    store: store, // This is for creating a session in the db to be referenced later if the server stops
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
app.use('/equipment', equipmentRouter);
app.use('/reports', reportRouter);
app.use('/badges', badgeRouter);
app.use('/dms', dmRouter);
app.use('/leaderboard', LeaderBoard);


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
  // console.log('index.ts attempting put');
  const { id } = req.params;
  // console.log(req.params);
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

/////////SOCKET IO/////////
io.on('connection', (socket) => {

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// httpServer.listen(8080, () => {
//   console.log('Server listening on port 8080');
// });


///// SEEDER FOR USERS ///////

app.post('/user', async (req, res) => {
  const user = req.body;
  const newUser = await prisma.user.create({ data: user });
  res.sendStatus(201);
});

//Listening
// app.listen(PORT, () =>
//   console.log(`App now listening for requests at: http://localhost:${PORT}`)
// );


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


