/*
  Warnings:

  - You are about to alter the column `mood` on the `PredictionValues` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `vibe` on the `PredictionValues` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `dance_type` on the `PredictionValues` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `acoustic_type` on the `PredictionValues` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `user_aproval` on the `PredictionValues` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "PredictionValues" ALTER COLUMN "mood" SET DATA TYPE INTEGER,
ALTER COLUMN "vibe" SET DATA TYPE INTEGER,
ALTER COLUMN "dance_type" SET DATA TYPE INTEGER,
ALTER COLUMN "acoustic_type" SET DATA TYPE INTEGER,
ALTER COLUMN "user_aproval" SET DEFAULT 0,
ALTER COLUMN "user_aproval" SET DATA TYPE INTEGER;
