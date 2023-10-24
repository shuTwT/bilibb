/*
  Warnings:

  - You are about to drop the column `latest_spear_id` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `latest_spear_id`,
    ADD COLUMN `latest_speak_id` INTEGER NULL,
    MODIFY `entry_num` INTEGER NOT NULL DEFAULT 0,
    MODIFY `first_entry_date` VARCHAR(191) NULL,
    MODIFY `latest_entry_date` VARCHAR(191) NULL,
    MODIFY `latest_speak_date` VARCHAR(191) NULL,
    MODIFY `likeability` INTEGER NOT NULL DEFAULT 0;
