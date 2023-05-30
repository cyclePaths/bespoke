const { Prisma, PrismaClient, Badge } = require('@prisma/client');
const prisma = new PrismaClient();

let reportsSeed = [
    //  HAZARD
  {
    title: 'Large Sinkhole',
    body: 'On the right side only.  Road crews on it.',
    type: 'Road Hazard',
    location_lat:  29.924974073488798, //  29.924974073488798, -90.08259640916626 6th and constance
    location_lng: -90.08259640916626,
    userId: 1,
    imgUrl: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685461347/1_xql8pq.png',
  },
//   {
//     title:
//     body:
//     type: 'Road Hazard',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Road Hazard',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Road Hazard',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Road Hazard',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   //   THEFT
  {
    title: 'Lock Properly!',
    body: 'Always hate to see this.  Front wheel was a quick release.  Remember to lock your frames people!',
    type: 'Theft Alert',
    location_lat:   29.925067058054037,//  29.925067058054037, -90.07818685768302  second and annunciation
    location_lng:   -90.07818685768302,
    userId: 1,
    imgUrl: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685461940/Screen_Shot_2023-04-30_at_9.01.59_PM_o0e7ve.png',
  },
//   {
//     title:
//     body:
//     type: 'Theft Alert',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Theft Alert',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Theft Alert',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Theft Alert',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
  //    COLLISION
    {
    title: 'Biker hit!',
    body: 'Biker was riding in the crosswalk and driver did not look right.  Both are to blame but please stop riding on the sidewalk people!',
    type: 'Collision',
    location_lat:   29.925067058054037, //  29.925067058054037, -90.08247839181261
    location_lng:   -90.08247839181261,
    userId: 1,
    imgUrl: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685461637/Screen_Shot_2023-04-30_at_9.08.50_PM_xt5vu8.png',
  },
//   {
//     title:
//     body:
//     type: 'Collision',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685461637/Screen_Shot_2023-04-30_at_9.08.50_PM_xt5vu8.png',
//   },
//   {
//     title:
//     body:
//     type: 'Collision',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Collision',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Collision',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },

  //    POI
  {
    title:  'Bike Repair Station',
    body: 'Pump works!  Used it to adjust my seat height.',
    type: 'Point of Interest',
    location_lat:   29.92348630863214,//  29.92348630863214, -90.07438884997833 soraparu and rousseau
    location_lng:   -90.07438884997833,
    userId: 1,
    imgUrl: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685462099/Screen_Shot_2023-04-30_at_9.00.47_PM_zh3nmr.png'
  },
//   {
//     title:
//     body:
//     type: 'Point of Interest',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Point of Interest',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Point of Interest',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
//   {
//     title:
//     body:
//     type: 'Point of Interest',
//     location_lat:
//     location_lng:
//     userId:
//     imgUrl:
//   },
];

async function seedReports() {
//   try {
//     //DO NOT UNCOMMENT BELOW WITHOUT READING WARNING
//     await prisma.report.deleteMany({}); //WARNING: This will clear badges from every user!!!
//   } catch (err) {
//     console.error('error deleting REPORTS before seeding', err);
//   }
  for (let i = 0; i < reportsSeed.length; i++) {
    const { title, body, type, location_lat, location_lng, userId, imgUrl } = reportsSeed[i];
    try {
      await prisma.report.create({
        data: {
          title: title,
          body: body,
          type: type,
          location_lat: location_lat,
          location_lng: location_lng,
          userId: userId,
          imgUrl: imgUrl
        },
      });
    } catch (err) {
      console.error('there was an error seeding REPORTS: ', err);
    }
  }
}

seedReports()
  .catch((err) => console.error('an error occurred when seeding REPORTS: ', err))
  .finally(() => prisma.$disconnect()); //unsure if this part is necessary?
