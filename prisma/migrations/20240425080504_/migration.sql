/*
  Warnings:

  - You are about to drop the `rednotice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sendgift` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysconfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysdept` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysdictdata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysdicttype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `syslogininfor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysmenu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysnotice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysoperlog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `syspost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysrole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysrolemenu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysuser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysuserrole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usercaptain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userdanmu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userentry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userfansmodal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userfavor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usergift` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userlike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userlog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userofficial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uservip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `live` DROP FOREIGN KEY `Live_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `rednotice` DROP FOREIGN KEY `RedNotice_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `sendgift` DROP FOREIGN KEY `SendGift_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `sendgift` DROP FOREIGN KEY `SendGift_uid_fkey`;

-- DropForeignKey
ALTER TABLE `speak` DROP FOREIGN KEY `Speak_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `speak` DROP FOREIGN KEY `Speak_uid_fkey`;

-- DropForeignKey
ALTER TABLE `syspost` DROP FOREIGN KEY `SysPost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `sysuser` DROP FOREIGN KEY `SysUser_sysDeptDeptId_fkey`;

-- DropForeignKey
ALTER TABLE `usercaptain` DROP FOREIGN KEY `UserCaptain_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `usercaptain` DROP FOREIGN KEY `UserCaptain_uid_fkey`;

-- DropForeignKey
ALTER TABLE `userdanmu` DROP FOREIGN KEY `UserDanmu_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `userdanmu` DROP FOREIGN KEY `UserDanmu_uid_fkey`;

-- DropForeignKey
ALTER TABLE `userentry` DROP FOREIGN KEY `UserEntry_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `userentry` DROP FOREIGN KEY `UserEntry_uid_fkey`;

-- DropForeignKey
ALTER TABLE `userfansmodal` DROP FOREIGN KEY `UserFansModal_uid_fkey`;

-- DropForeignKey
ALTER TABLE `userfavor` DROP FOREIGN KEY `UserFavor_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `userfavor` DROP FOREIGN KEY `UserFavor_uid_fkey`;

-- DropForeignKey
ALTER TABLE `usergift` DROP FOREIGN KEY `UserGift_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `usergift` DROP FOREIGN KEY `UserGift_uid_fkey`;

-- DropForeignKey
ALTER TABLE `userlike` DROP FOREIGN KEY `UserLike_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `userlike` DROP FOREIGN KEY `UserLike_uid_fkey`;

-- DropForeignKey
ALTER TABLE `userlog` DROP FOREIGN KEY `UserLog_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `userlog` DROP FOREIGN KEY `UserLog_uid_fkey`;

-- DropForeignKey
ALTER TABLE `userofficial` DROP FOREIGN KEY `UserOfficial_uid_fkey`;

-- DropForeignKey
ALTER TABLE `uservip` DROP FOREIGN KEY `UserVip_uid_fkey`;

-- DropTable
DROP TABLE `rednotice`;

-- DropTable
DROP TABLE `sendgift`;

-- DropTable
DROP TABLE `sysconfig`;

-- DropTable
DROP TABLE `sysdept`;

-- DropTable
DROP TABLE `sysdictdata`;

-- DropTable
DROP TABLE `sysdicttype`;

-- DropTable
DROP TABLE `syslogininfor`;

-- DropTable
DROP TABLE `sysmenu`;

-- DropTable
DROP TABLE `sysnotice`;

-- DropTable
DROP TABLE `sysoperlog`;

-- DropTable
DROP TABLE `syspost`;

-- DropTable
DROP TABLE `sysrole`;

-- DropTable
DROP TABLE `sysrolemenu`;

-- DropTable
DROP TABLE `sysuser`;

-- DropTable
DROP TABLE `sysuserrole`;

-- DropTable
DROP TABLE `usercaptain`;

-- DropTable
DROP TABLE `userdanmu`;

-- DropTable
DROP TABLE `userentry`;

-- DropTable
DROP TABLE `userfansmodal`;

-- DropTable
DROP TABLE `userfavor`;

-- DropTable
DROP TABLE `usergift`;

-- DropTable
DROP TABLE `userlike`;

-- DropTable
DROP TABLE `userlog`;

-- DropTable
DROP TABLE `userofficial`;

-- DropTable
DROP TABLE `uservip`;

-- CreateTable
CREATE TABLE `sys_dept` (
    `deptId` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NOT NULL DEFAULT 0,
    `ancestors` VARCHAR(191) NOT NULL DEFAULT '',
    `deptName` VARCHAR(191) NOT NULL DEFAULT '',
    `sort` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 1,
    `leader` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `delFlag` BOOLEAN NOT NULL DEFAULT false,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`deptId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `deptId` INTEGER NULL,
    `userName` VARCHAR(191) NOT NULL,
    `nickName` VARCHAR(191) NOT NULL,
    `userType` VARCHAR(191) NOT NULL DEFAULT '00',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `phonenumber` VARCHAR(191) NOT NULL DEFAULT '',
    `sex` INTEGER NOT NULL DEFAULT 0,
    `avatar` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `loginIp` VARCHAR(191) NOT NULL DEFAULT '',
    `loginDate` VARCHAR(191) NULL,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `delFlag` BOOLEAN NOT NULL DEFAULT false,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,
    `sysDeptDeptId` INTEGER NOT NULL DEFAULT 100,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(191) NOT NULL,
    `postName` VARCHAR(191) NOT NULL,
    `postSort` INTEGER NOT NULL,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `delFlag` BOOLEAN NOT NULL DEFAULT false,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_role` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,
    `roleKey` VARCHAR(191) NOT NULL,
    `roleSort` INTEGER NOT NULL,
    `dataScope` VARCHAR(191) NOT NULL DEFAULT '1',
    `menuCheckStrictly` BOOLEAN NOT NULL DEFAULT true,
    `deptCheckStrictly` BOOLEAN NOT NULL DEFAULT true,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `delFlag` BOOLEAN NOT NULL DEFAULT false,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_menu` (
    `menuId` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NOT NULL DEFAULT 0,
    `menuType` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `menuName` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL DEFAULT '',
    `component` VARCHAR(191) NOT NULL,
    `rank` INTEGER NULL DEFAULT 0,
    `redirect` VARCHAR(191) NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `extraIcon` VARCHAR(191) NOT NULL DEFAULT '',
    `enterTransition` VARCHAR(191) NOT NULL DEFAULT '',
    `leaveTransition` VARCHAR(191) NOT NULL DEFAULT '',
    `activePath` VARCHAR(191) NOT NULL DEFAULT '',
    `auths` VARCHAR(191) NOT NULL DEFAULT '',
    `frameSrc` VARCHAR(191) NOT NULL DEFAULT '',
    `frameLoading` BOOLEAN NOT NULL DEFAULT true,
    `keepAlive` BOOLEAN NOT NULL DEFAULT false,
    `hiddenTag` BOOLEAN NOT NULL DEFAULT false,
    `showLink` BOOLEAN NOT NULL DEFAULT true,
    `showParent` BOOLEAN NOT NULL DEFAULT false,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user_role` (
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_role_menu` (
    `roleId` INTEGER NOT NULL,
    `menuId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_oper_log` (
    `operId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `method` VARCHAR(191) NOT NULL DEFAULT '',
    `requestMethod` VARCHAR(191) NOT NULL DEFAULT '',
    `operName` VARCHAR(191) NOT NULL DEFAULT '',
    `operUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `operIp` VARCHAR(191) NOT NULL DEFAULT '',
    `status` CHAR(1) NOT NULL DEFAULT '0',

    PRIMARY KEY (`operId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dict_type` (
    `dictId` INTEGER NOT NULL AUTO_INCREMENT,
    `dictName` VARCHAR(191) NOT NULL DEFAULT '',
    `dictType` VARCHAR(191) NOT NULL DEFAULT '',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    UNIQUE INDEX `sys_dict_type_dictType_key`(`dictType`),
    PRIMARY KEY (`dictId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dict_data` (
    `dictCode` INTEGER NOT NULL AUTO_INCREMENT,
    `dictSort` INTEGER NOT NULL DEFAULT 0,
    `dictLabel` VARCHAR(191) NOT NULL DEFAULT '',
    `dictValue` VARCHAR(191) NOT NULL DEFAULT '',
    `dictType` VARCHAR(191) NOT NULL DEFAULT '',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`dictCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_config` (
    `configId` INTEGER NOT NULL AUTO_INCREMENT,
    `configName` VARCHAR(191) NOT NULL DEFAULT '',
    `configKey` VARCHAR(191) NOT NULL DEFAULT '',
    `configValue` VARCHAR(500) NOT NULL DEFAULT '',
    `configType` VARCHAR(191) NOT NULL DEFAULT '1',
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`configId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_logininfor` (
    `infoId` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL DEFAULT '',
    `ipaddr` VARCHAR(191) NOT NULL DEFAULT '',
    `loginLocation` VARCHAR(191) NOT NULL DEFAULT '',
    `browser` VARCHAR(191) NOT NULL DEFAULT '',
    `os` VARCHAR(191) NOT NULL DEFAULT '',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `msg` VARCHAR(191) NOT NULL DEFAULT '',
    `loginTime` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`infoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_notice` (
    `noticeId` INTEGER NOT NULL AUTO_INCREMENT,
    `noticeTitle` VARCHAR(191) NOT NULL,
    `noticeType` VARCHAR(191) NOT NULL,
    `noticeContent` VARCHAR(191) NOT NULL,
    `noticeReaded` VARCHAR(191) NOT NULL DEFAULT '0',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`noticeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_fans_modal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_fans_modal_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_official` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,

    UNIQUE INDEX `user_official_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_vip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `role` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT '#FB7299',

    UNIQUE INDEX `user_vip_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `send_gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `giftId` INTEGER NOT NULL,
    `giftName` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `red_notice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` VARCHAR(191) NOT NULL,
    `redNoticeTag` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_entry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,

    UNIQUE INDEX `user_entry_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_danmu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,

    UNIQUE INDEX `user_danmu_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_captain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,

    UNIQUE INDEX `user_captain_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,

    UNIQUE INDEX `user_like_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,

    UNIQUE INDEX `user_gift_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_favor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `favor` INTEGER NOT NULL DEFAULT 0,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,

    UNIQUE INDEX `sys_favor_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sys_user` ADD CONSTRAINT `sys_user_sysDeptDeptId_fkey` FOREIGN KEY (`sysDeptDeptId`) REFERENCES `sys_dept`(`deptId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_post` ADD CONSTRAINT `sys_post_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `sys_user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_log` ADD CONSTRAINT `user_log_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_log` ADD CONSTRAINT `user_log_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_fans_modal` ADD CONSTRAINT `user_fans_modal_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_official` ADD CONSTRAINT `user_official_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_vip` ADD CONSTRAINT `user_vip_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `live` ADD CONSTRAINT `live_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `speak` ADD CONSTRAINT `speak_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `speak` ADD CONSTRAINT `speak_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `send_gift` ADD CONSTRAINT `send_gift_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `send_gift` ADD CONSTRAINT `send_gift_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `red_notice` ADD CONSTRAINT `red_notice_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_entry` ADD CONSTRAINT `user_entry_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_entry` ADD CONSTRAINT `user_entry_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_danmu` ADD CONSTRAINT `user_danmu_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_danmu` ADD CONSTRAINT `user_danmu_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_captain` ADD CONSTRAINT `user_captain_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_captain` ADD CONSTRAINT `user_captain_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_like` ADD CONSTRAINT `user_like_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_like` ADD CONSTRAINT `user_like_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_gift` ADD CONSTRAINT `user_gift_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_gift` ADD CONSTRAINT `user_gift_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_favor` ADD CONSTRAINT `sys_favor_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_favor` ADD CONSTRAINT `sys_favor_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `gift` RENAME INDEX `Gift_giftId_key` TO `gift_giftId_key`;

-- RenameIndex
ALTER TABLE `live` RENAME INDEX `Live_roomId_date_key` TO `live_roomId_date_key`;

-- RenameIndex
ALTER TABLE `room` RENAME INDEX `Room_roomId_key` TO `room_roomId_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_uid_key` TO `user_uid_key`;
