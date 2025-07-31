/*
  Warnings:

  - You are about to drop the column `service_time` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `technician_availabilities` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `technician_availabilities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[technician_id,service_date,time_block]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[technician_id,available_date,time_block]` on the table `technician_availabilities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `time_block` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_block` to the `technician_availabilities` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimeBlock" AS ENUM ('morning', 'afternoon', 'evening');

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "service_time",
ADD COLUMN     "time_block" "TimeBlock" NOT NULL;

-- AlterTable
ALTER TABLE "technician_availabilities" DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "time_block" "TimeBlock" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bookings_technician_id_service_date_time_block_key" ON "bookings"("technician_id", "service_date", "time_block");

-- CreateIndex
CREATE UNIQUE INDEX "technician_availabilities_technician_id_available_date_time_key" ON "technician_availabilities"("technician_id", "available_date", "time_block");
