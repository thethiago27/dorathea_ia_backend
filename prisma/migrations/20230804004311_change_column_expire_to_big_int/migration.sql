/*
  Warnings:

  - Added the required column `expires_in` to the `SpotifyToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpotifyToken" DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" BIGINT NOT NULL;
