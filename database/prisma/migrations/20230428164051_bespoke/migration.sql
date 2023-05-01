/*
  Warnings:

  - Added the required column `equipmentDescription` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "equipmentDescription" TEXT NOT NULL,
ALTER COLUMN "imgUrl" DROP NOT NULL,
ALTER COLUMN "imgUrl" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "DirectMessages" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "fromMe" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DirectMessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DirectMessages" ADD CONSTRAINT "DirectMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DirectMessages" ADD CONSTRAINT "DirectMessages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
