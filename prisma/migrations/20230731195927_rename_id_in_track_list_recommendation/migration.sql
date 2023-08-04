/*
  Warnings:

  - The primary key for the `TrackListRecommendation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playlistId` on the `TrackListRecommendation` table. All the data in the column will be lost.
  - Added the required column `id` to the `TrackListRecommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrackListRecommendation" DROP CONSTRAINT "TrackListRecommendation_pkey",
DROP COLUMN "playlistId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TrackListRecommendation_pkey" PRIMARY KEY ("id");
