/*
  Warnings:

  - You are about to drop the `Track` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_trackListRecommendationPlaylistId_fkey";

-- AlterTable
ALTER TABLE "TrackListRecommendation" ADD COLUMN     "tracks" TEXT[];

-- DropTable
DROP TABLE "Track";

-- CreateTable
CREATE TABLE "Tracks" (
    "id_mappings" TEXT NOT NULL,
    "track_uri_id" TEXT NOT NULL,

    CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id_mappings")
);
