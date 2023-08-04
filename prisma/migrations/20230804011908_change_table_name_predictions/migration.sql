/*
  Warnings:

  - You are about to drop the `TrackListRecommendation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrackListRecommendation" DROP CONSTRAINT "TrackListRecommendation_user_id_fkey";

-- DropTable
DROP TABLE "TrackListRecommendation";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Predictions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Predictions_pkey" PRIMARY KEY ("id")
);
