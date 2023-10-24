/*
  Warnings:

  - Added the required column `entry_num` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fans_num` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_entry_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latest_entry_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latest_speak_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latest_spear_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likeability` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `entry_num` INTEGER NOT NULL,
    ADD COLUMN `fans_num` INTEGER NOT NULL,
    ADD COLUMN `first_entry_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `latest_entry_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `latest_speak_date` VARCHAR(191) NOT NULL,
    ADD COLUMN `latest_spear_id` INTEGER NOT NULL,
    ADD COLUMN `likeability` INTEGER NOT NULL,
    MODIFY `uid` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` VARCHAR(191) NOT NULL,
    `room_owner_uid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Room_room_id_key`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Live` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` VARCHAR(191) NOT NULL,
    `entry_num` INTEGER NOT NULL,
    `speak_num` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Live_room_id_key`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Speak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
