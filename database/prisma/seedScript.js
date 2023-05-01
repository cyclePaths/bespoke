const { Prisma, PrismaClient, Badge } = require('@prisma/client');
const prisma = new PrismaClient();

let badgesSeed = [
  {
    name: 'Certified',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/10552/10552271.png',
  },
  {
    name: 'Bespoke Devotee',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3187/3187707.png',
  },
  {
    name: 'Monthly Trekker',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/4729/4729360.png',
    tier: 1,
  },
  {
    name: 'Monthly Trekker',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/4729/4729427.png',
    tier: 2,
  },
  {
    name: 'Monthly Trekker',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/4729/4729468.png',
    tier: 3,
  },
  {
    name: 'Dedicated Rider',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3732/3732641.png',
    tier: 1,
  },
  {
    name: 'Dedicated Rider',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3732/3732818.png',
    tier: 2,
  },
  {
    name: 'Dedicated Rider',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3732/3732831.png',
    tier: 3,
  },
  {
    name: 'Early Bird',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3222/3222792.png',
  },
  {
    name: 'Night Rider',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1164/1164955.png',
  },
  {
    name: 'Tourist',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3284/3284668.png',
  },
  {
    name: 'World Traveler',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/805/805504.png',
  },
  {
    name: 'Iron Lungs',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/10048/10048662.png',
  },
  {
    name: 'Cold Blooded',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/4853/4853276.png',
  },
  {
    name: 'Boiling Blood',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3213/3213476.png ',
  },
  {
    name: 'Road Warrior',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/5716/5716448.png',
    tier: 1,
  },
  {
    name: 'Road Warrior',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/5716/5716482.png',
    tier: 2,
  },
  {
    name: 'Road Warrior',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/5716/5716364.png',
    tier: 3,
  },
  {
    name: 'Lean Machine',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2764/2764477.png',
    tier: 1,
  },
  {
    name: 'Lean Machine',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2764/2764485.png',
    tier: 2,
  },
  {
    name: 'Lean Machine',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2764/2764444.png',
    tier: 3,
  },
  {
    name: 'Community Enthusiast',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/10484/10484487.png',
    tier: 1,
  },
  {
    name: 'Community Enthusiast',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/10484/10484478.png',
    tier: 2,
  },
  {
    name: 'Community Enthusiast',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/10484/10484489.png',
    tier: 3,
  },
  {
    name: 'Wheelie Popular',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3180/3180255.png',
    tier: 1,
  },
  {
    name: 'Wheelie Popular',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3180/3180254.png',
    tier: 2,
  },
  {
    name: 'Wheelie Popular',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3180/3180279.png',
    tier: 3,
  },
  {
    name: 'Storm Chaser',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3714/3714608.png ',
    tier: 1,
  },
  {
    name: 'Storm Chaser',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3949/3949333.png ',
    tier: 2,
  },
  {
    name: 'Storm Chaser',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1809/1809765.png',
    tier: 3,
  },
  {
    name: 'Fairweather Friend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1187/1187614.png',
    tier: 1,
  },
  {
    name: 'Fairweather Friend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1289/1289318.png',
    tier: 2,
  },
  {
    name: 'Fairweather Friend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1187/1187563.png',
    tier: 3,
  },
  {
    name: 'Safety Sentinel',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/4841/4841877.png',
    tier: 1,
  },
  {
    name: 'Safety Sentinel',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/4841/4841012.png',
    tier: 2,
  },
  {
    name: 'Safety Sentinel',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/4841/4841913.png',
    tier: 3,
  },
  {
    name: 'Speedster',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/983/983534.png',
    tier: 1,
  },
  {
    name: 'Speedster',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/5716/5716482.png',
    tier: 2,
  },
  {
    name: 'Speedster',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3601/3601647.png',
    tier: 3,
  },
  {
    name: 'Centurion',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2720/2720080.png',
  },
  {
    name: 'Social Butterfly',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/7651/7651003.png',
    tier: 1,
  },
  {
    name: 'Social Butterfly',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2849/2849891.png',
    tier: 2,
  },
  {
    name: 'Social Butterfly',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2281/2281179.png',
    tier: 3,
  },
  {
    name: 'Explorer',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3284/3284424.png',
    tier: 1,
  },
  {
    name: 'Explorer',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3284/3284668.png',
    tier: 2,
  },
  {
    name: 'Explorer',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3284/3284649.png',
    tier: 3,
  },
  {
    name: 'Tour Guide',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1909/1909704.png',
    tier: 1,
  },
  {
    name: 'Tour Guide',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1910/1910008.png',
    tier: 2,
  },
  {
    name: 'Tour Guide',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1910/1910054.png',
    tier: 3,
  },
  {
    name: 'Riding Streak',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2830/2830977.png',
  },
  {
    name: 'Disciplined',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3587/3587204.png',
    tier: 1,
  },
  {
    name: 'Disciplined',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3587/3587286.png',
    tier: 2,
  },
  {
    name: 'Disciplined',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3587/3587252.png',
    tier: 3,
  },
  {
    name: 'Disciplined',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3270/3270523.png',
    tier: 4,
  },
  {
    name: 'Disciplined',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3270/3270507.png',
    tier: 5,
  },
  {
    name: 'Disciplined',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3270/3270465.png',
    tier: 6,
  },
  {
    name: 'Karen',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/539/539982.png',
  },
  {
    name: 'Lean Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3842/3842868.png',
    tier: 1,
  },
  {
    name: 'Lean Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3843/3843145.png',
    tier: 2,
  },
  {
    name: 'Lean Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/3843/3843036.png',
    tier: 3,
  },
  {
    name: 'Community Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/10165/10165757.png',
    tier: 1,
  },
  {
    name: 'Community Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/10484/10484489.png',
    tier: 2,
  },
  {
    name: 'Community Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/5969/5969296.png',
    tier: 3,
  },
  {
    name: 'Traveling Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2484/2484761.png',
    tier: 1,
  },
  {
    name: 'Traveling Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2484/2484627.png',
    tier: 2,
  },
  {
    name: 'Traveling Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2484/2484596.png',
    tier: 3,
  },
  {
    name: 'Likable Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/456/456115.png',
    tier: 1,
  },
  {
    name: 'Likable Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/10157/10157022.png',
    tier: 2,
  },
  {
    name: 'Likable Legend',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/6449/6449195.png',
    tier: 3,
  },
  {
    name: 'Legendary Warden',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/923/923759.png',
    tier: 1,
  },
  {
    name: 'Legendary Warden',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/923/923810.png',
    tier: 2,
  },
  {
    name: 'Legendary Warden',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/7440/7440173.png',
    tier: 3,
  },
  {
    name: 'Legendary Explorer',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/2988/2988750.png',
    tier: 1,
  },
  {
    name: 'Legendary Explorer',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/9495/9495481.png',
    tier: 2,
  },
  {
    name: 'Legendary Explorer',
    badgeIcon: 'https://cdn-icons-png.flaticon.com/512/1257/1257385.png',
    tier: 3,
  },
];

async function seedBadges() {
  try {
    //DO NOT UNCOMMENT BELOW WITHOUT READING WARNING
    await prisma.badgesOnUsers.deleteMany({}); //WARNING: This will clear badges from every user!!!
    await prisma.badge.deleteMany({});
  } catch (err) {
    console.error('there was an error deleting old badges ', err);
  }
  for (let i = 0; i < badgesSeed.length; i++) {
    let tier = null;
    if (badgesSeed[i].tier) {
      tier = badgesSeed[i].tier;
    }
    try {
      await prisma.badge.create({
        data: {
          name: badgesSeed[i].name,
          badgeIcon: badgesSeed[i].badgeIcon,
          tier: tier,
        },
      });
    } catch (err) {
      console.error('there was an error seeding badges: ', err);
    }
    try {
      await prisma.user.updateMany({
        data: {
          selectedBadge:
            'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg',
        },
      });
    } catch (err) {
      console.error(
        'there was an error resetting selected badges for users: ',
        err
      );
    }
  }
}

seedBadges()
  .catch((err) => console.error('an error occurred when seeding Badges: ', err))
  .finally(() => prisma.$disconnect()); //unsure if this part is necessary?
