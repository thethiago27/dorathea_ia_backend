/*
  Warnings:

  - The `expires_in` column on the `SpotifyToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SpotifyToken" DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" TIMESTAMPTZ(3);
