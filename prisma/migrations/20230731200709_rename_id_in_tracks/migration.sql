/*
  Warnings:

  - The primary key for the `Tracks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_mappings` on the `Tracks` table. All the data in the column will be lost.
  - Added the required column `id_mapping` to the `Tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tracks" DROP CONSTRAINT "Tracks_pkey",
DROP COLUMN "id_mappings",
ADD COLUMN     "id_mapping" TEXT NOT NULL,
ADD CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id_mapping");
