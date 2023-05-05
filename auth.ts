import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } from './config';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { deserialize } from 'v8';
import md5 from 'md5';
const prisma = new PrismaClient();

interface CreateUser {
  email: string;
  name: string;
  thumbnail?: string | null;
  weight?: number;
  favAddresses?: string[];
  homeAddress?: string;
  location_lat?;
  location_lng?;
  totalMiles?: number;
  totalLikes?: number;
  totalPosts?: number;
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // callbackURL: GOOGLE_CALLBACK_URL,
      callbackURL: 'http://localhost:8080/google/callback',
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const previousUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (previousUser) {
          return done(null, previousUser);
        } else {
          const emailHash = md5(profile.email.toLowerCase()); // Use md5 hash of email as identifier
          const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=96&d=identicon`;
          const newUserData = {
            email: profile.email,
            name: profile.displayName,
            thumbnail: profile._json.picture || gravatarUrl, // Use profile picture URL if available, otherwise use default avatar URL
          };

          const newUser = await prisma.user.create({
            data: newUserData,
          });
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
