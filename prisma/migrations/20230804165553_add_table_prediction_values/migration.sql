/*
  Warnings:

  - You are about to drop the column `prediction_input` on the `Predictions` table. All the data in the column will be lost.
  - Added the required column `predictionValuesId` to the `Predictions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Predictions" DROP COLUMN "prediction_input",
ADD COLUMN     "predictionValuesId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PredictionValues" (
    "id" TEXT NOT NULL,
    "mood" DOUBLE PRECISION NOT NULL,
    "vibe" DOUBLE PRECISION NOT NULL,
    "dance_type" DOUBLE PRECISION NOT NULL,
    "acoustic_type" DOUBLE PRECISION NOT NULL,
    "user_aproval" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PredictionValues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Predictions" ADD CONSTRAINT "Predictions_predictionValuesId_fkey" FOREIGN KEY ("predictionValuesId") REFERENCES "PredictionValues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
