-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "weight" INTEGER,
    "favAddresses" TEXT[],
    "homeAddress" TEXT,
    "location_lat" DOUBLE PRECISION,
    "location_lng" DOUBLE PRECISION,
    "theme" BOOLEAN NOT NULL DEFAULT false,
    "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileComplete" BOOLEAN NOT NULL DEFAULT false,
    "firstRideCity" TEXT NOT NULL DEFAULT '',
    "firstRideCountry" TEXT NOT NULL DEFAULT '',
    "monthlyMiles" INTEGER NOT NULL DEFAULT 0,
    "mostMonthlyMiles" INTEGER NOT NULL DEFAULT 0,
    "totalMiles" INTEGER NOT NULL DEFAULT 0,
    "totalBadWeatherMiles" INTEGER NOT NULL DEFAULT 0,
    "totalGoodWeatherMiles" INTEGER NOT NULL DEFAULT 0,
    "totalCaloriesBurned" INTEGER NOT NULL DEFAULT 0,
    "totalMinutesAboveTime" INTEGER NOT NULL DEFAULT 0,
    "highestRideStreak" INTEGER NOT NULL DEFAULT 0,
    "mostWeeklyRides" INTEGER NOT NULL DEFAULT 0,
    "ridesThisWeek" INTEGER NOT NULL DEFAULT 0,
    "totalRides" INTEGER NOT NULL DEFAULT 0,
    "totalPosts" INTEGER NOT NULL DEFAULT 0,
    "totalReports" INTEGER NOT NULL DEFAULT 0,
    "totalDownvotedReports" INTEGER NOT NULL DEFAULT 0,
    "monthlyDownvotedReports" INTEGER NOT NULL DEFAULT 0,
    "totalRoutes" INTEGER NOT NULL DEFAULT 0,
    "totalLikesGiven" INTEGER NOT NULL DEFAULT 0,
    "totalLikesReceived" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgesOnUsers" (
    "userId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BadgesOnUsers_pkey" PRIMARY KEY ("userId","badgeId")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "badgeIcon" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "location_lat" DOUBLE PRECISION,
    "location_lng" DOUBLE PRECISION,
    "userId" INTEGER NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bulletin" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bulletin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "equipmentType" TEXT NOT NULL,
    "imgUrl" TEXT[],
    "bulletinId" INTEGER NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "bulletinOrigin" INTEGER,
    "commentCreator" TEXT NOT NULL,
    "commentText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BikeRoutes" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "destination" DECIMAL(65,30)[],
    "origin" DECIMAL(65,30)[],
    "likes" INTEGER DEFAULT 0,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BikeRoutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteLike" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "bikeRouteId" INTEGER NOT NULL,

    CONSTRAINT "RouteLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rides" (
    "id" SERIAL NOT NULL,
    "activity" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Rides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "session"("expire");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BadgesOnUsers" ADD CONSTRAINT "BadgesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgesOnUsers" ADD CONSTRAINT "BadgesOnUsers_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_bulletinId_fkey" FOREIGN KEY ("bulletinId") REFERENCES "Bulletin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_bulletinOrigin_fkey" FOREIGN KEY ("bulletinOrigin") REFERENCES "Bulletin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeRoutes" ADD CONSTRAINT "BikeRoutes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteLike" ADD CONSTRAINT "RouteLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteLike" ADD CONSTRAINT "RouteLike_bikeRouteId_fkey" FOREIGN KEY ("bikeRouteId") REFERENCES "BikeRoutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rides" ADD CONSTRAINT "Rides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
