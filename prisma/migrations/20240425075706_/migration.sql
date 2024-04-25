/*
  Warnings:

  - You are about to alter the column `updateTime` on the `sysconfig` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updateTime` on the `sysdept` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - The primary key for the `sysdictdata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dictCode` on the `sysdictdata` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `updateTime` on the `sysdictdata` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updateTime` on the `sysdicttype` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - The primary key for the `syslogininfor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `infoId` on the `syslogininfor` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `updateTime` on the `sysmenu` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updateTime` on the `sysnotice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updateTime` on the `syspost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updateTime` on the `sysrole` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updateTime` on the `sysuser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the `options` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `createTime` on table `sysconfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createTime` on table `sysdept` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createTime` on table `sysdictdata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createTime` on table `sysdicttype` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createTime` on table `sysmenu` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createTime` on table `sysnotice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createTime` on table `syspost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createTime` on table `sysrole` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createTime` on table `sysuser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `gift` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `giftPrice` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `live` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `active` CHAR(1) NOT NULL DEFAULT '0',
    ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sendgift` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `speak` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sysconfig` MODIFY `configValue` VARCHAR(500) NOT NULL DEFAULT '',
    MODIFY `configType` VARCHAR(191) NOT NULL DEFAULT '1',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL,
    MODIFY `remark` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `sysdept` MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL,
    MODIFY `remark` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `sysdictdata` DROP PRIMARY KEY,
    MODIFY `dictCode` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL,
    MODIFY `remark` VARCHAR(500) NULL,
    ADD PRIMARY KEY (`dictCode`);

-- AlterTable
ALTER TABLE `sysdicttype` MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL,
    MODIFY `remark` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `syslogininfor` DROP PRIMARY KEY,
    MODIFY `infoId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    ADD PRIMARY KEY (`infoId`);

-- AlterTable
ALTER TABLE `sysmenu` MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL,
    MODIFY `remark` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `sysnotice` MODIFY `noticeReaded` VARCHAR(191) NOT NULL DEFAULT '0',
    MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sysoperlog` MODIFY `status` CHAR(1) NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `syspost` MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL,
    MODIFY `remark` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `sysrole` MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL,
    MODIFY `remark` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `sysuser` MODIFY `status` CHAR(1) NOT NULL DEFAULT '0',
    MODIFY `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updateTime` DATETIME(3) NULL,
    MODIFY `remark` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `usercaptain` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `userdanmu` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `userentry` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `userfavor` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `usergift` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `userlike` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `userlog` ADD COLUMN `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `updateTime` DATETIME(3) NULL;

-- DropTable
DROP TABLE `options`;

-- CreateTable
CREATE TABLE `SysUserRole` (
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
