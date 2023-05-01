# Welcome to Bespoke

## Pitch

Image if you will, a site that allows bicyclist to come together and share in their love for biking. We have you covered. Welcome to Bespoke; the one stop for sharing all content in relation to biking.

### MVP

- A single app designed for users to create routes that can be shared, report problems around their neighborhood to others in the area, post on the forums about any topics, and track weather patterns while giving the user a good experience
- Users will be able to create routes from point A to B, which can be searched by other people in the area
- Weather will be provided for the user's location from a 4 window cycle on the home screen, and in a view that shows the whole day and more details
- Users can also report problems locally to keep other users in the know about other things going on around them
- A Bulletin Board was implemented to give the users the ability to interact with others on different topics
- On a user's profile they can customize with address and also put in info that is great for fitness tracking
  - On a side note: this app uses geolocation for a lot of our features

## Feature-Freeze

- Users have more customization within their profile letting them switch the app to dark mode
- Achievements have been added to give a user a fun experience as they use the app
  - Badges are symbols that represent when an achievement is received and will display ones selected by the user next to their name everywhere it is present
- A Leaderboard was also created to give the users a look at the top users of any of the 5 categories created
- The Bulletin Board now offers users a change to exchange bike parts if they need something
- The Reports page got a huge revamp that allows not only reports, but also allows a user to take a picture of the current problem and upload them along with the report

## Setup

- For devs who want to work on these features keep in mind a lot of setup will be needed
- IMPORTANT: unless you want to refactor a lot of things we highly suggest using a Postgresql database or a SQL one for ease of use
  - First clone down a fork of the repo
  - Then once you have the forked version on your local environment of your choice, run npm install to get all dependencies you need
  - Add the database to your db of choice (name: bespoke)
  - Next cd into the database path and while the database is running, run the command npx prisma generate/migrate (this will create your tables in your database)
    - Any time you make changes to your database run the command in the database path npx prisma db push
  - Next run npm run seed:Badge, to seed all the badges needed for the achievements
  - For development run npm run dev to run the build and server
  - Make sure to code in Typescript: WARNING!!! Typescript is required to work on this project
  - The example.env file is built out to have all the keys and oauth credencials needed for the project to work
  - Finally edit the google maps api script in the index.html to include your own api key so the map will work
- Any questions/issue with the project feel free to reach out to the team at https://github.com/cyclePaths/bespoke/issues/

## Tech Stack

- Project Management: Trello, Notion, Figma
- Deployment: AWS (EC2 Ubuntu, RDS)
- Image Hosting: Cloudinary
- Environment: NodeJS, Typescript(Language)
- Front-End: React, styled-components, MUI, CSS
- Back-End: Express, Socket.io
- Database/ORM: Postgresql with Prisma
- Linting: ESList
- Auth: Passport, Google OAuth2
- APIs: https://api.api-ninjas.com/v1/caloriesburned , https://api.open-meteo.com/v1/forecast , Google Maps API, Cloudinary API
