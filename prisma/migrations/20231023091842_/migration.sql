/*
  Warnings:

  - You are about to drop the column `entry_num` on the `live` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `live` table. All the data in the column will be lost.
  - You are about to drop the column `speak_num` on the `live` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `room_owner_uid` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `entry_num` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `fans_num` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `first_entry_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `latest_entry_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `latest_speak_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `latest_speak_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `likeability` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `Live` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entryNum` to the `Live` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Live` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speakNum` to the `Live` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomOwnerUid` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Live_room_id_key` ON `live`;

-- DropIndex
DROP INDEX `Room_room_id_key` ON `room`;

-- AlterTable
ALTER TABLE `live` DROP COLUMN `entry_num`,
    DROP COLUMN `room_id`,
    DROP COLUMN `speak_num`,
    ADD COLUMN `entryNum` INTEGER NOT NULL,
    ADD COLUMN `roomId` VARCHAR(191) NOT NULL,
    ADD COLUMN `speakNum` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `room_id`,
    DROP COLUMN `room_owner_uid`,
    ADD COLUMN `roomId` VARCHAR(191) NOT NULL,
    ADD COLUMN `roomOwnerUid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `entry_num`,
    DROP COLUMN `fans_num`,
    DROP COLUMN `first_entry_date`,
    DROP COLUMN `latest_entry_date`,
    DROP COLUMN `latest_speak_date`,
    DROP COLUMN `latest_speak_id`,
    DROP COLUMN `likeability`,
    ADD COLUMN `entryNum` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fansNum` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `firstEntryDate` VARCHAR(191) NULL,
    ADD COLUMN `latestEntryDate` VARCHAR(191) NULL,
    ADD COLUMN `latestSpeakDate` VARCHAR(191) NULL,
    ADD COLUMN `latestSpeakId` INTEGER NULL,
    ADD COLUMN `likeAbility` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Live_roomId_key` ON `Live`(`roomId`);

-- CreateIndex
CREATE UNIQUE INDEX `Room_roomId_key` ON `Room`(`roomId`);
