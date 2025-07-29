/*
  Warnings:

  - A unique constraint covering the columns `[user_id,street,city,state,zip]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addresses_user_id_street_city_state_zip_key" ON "addresses"("user_id", "street", "city", "state", "zip");
