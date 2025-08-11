--  Add partial unique index for isPrimary
CREATE UNIQUE INDEX "one_primary_address_per_user"
ON "addresses" ("user_id")
WHERE "isPrimary" = TRUE;
