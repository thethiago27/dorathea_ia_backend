/*
  Warnings:

  - The primary key for the `Tracks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id_mapping` on the `Tracks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tracks" DROP CONSTRAINT "Tracks_pkey",
DROP COLUMN "id_mapping",
ADD COLUMN     "id_mapping" INTEGER NOT NULL,
ADD CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id_mapping");
