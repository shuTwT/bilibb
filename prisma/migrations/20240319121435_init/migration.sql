-- CreateTable
CREATE TABLE `SysDept` (
    `deptId` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NOT NULL DEFAULT 0,
    `ancestors` VARCHAR(191) NOT NULL DEFAULT '',
    `deptName` VARCHAR(191) NOT NULL DEFAULT '',
    `sort` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 1,
    `leader` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `delFlag` BOOLEAN NOT NULL DEFAULT false,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`deptId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysUser` (
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
    `status` INTEGER NOT NULL DEFAULT 1,
    `delFlag` BOOLEAN NOT NULL DEFAULT false,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `sysDeptDeptId` INTEGER NOT NULL DEFAULT 100,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysPost` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(191) NOT NULL,
    `postName` VARCHAR(191) NOT NULL,
    `postSort` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `delFlag` BOOLEAN NOT NULL DEFAULT false,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysRole` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,
    `roleKey` VARCHAR(191) NOT NULL,
    `roleSort` INTEGER NOT NULL,
    `dataScope` VARCHAR(191) NOT NULL DEFAULT '1',
    `menuCheckStrictly` BOOLEAN NOT NULL DEFAULT true,
    `deptCheckStrictly` BOOLEAN NOT NULL DEFAULT true,
    `status` INTEGER NOT NULL DEFAULT 1,
    `delFlag` BOOLEAN NOT NULL DEFAULT false,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysMenu` (
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
    `status` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysRoleMenu` (
    `roleId` INTEGER NOT NULL,
    `menuId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysOperLog` (
    `operId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `method` VARCHAR(191) NOT NULL DEFAULT '',
    `requestMethod` VARCHAR(191) NOT NULL DEFAULT '',
    `operName` VARCHAR(191) NOT NULL DEFAULT '',
    `operUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `operIp` VARCHAR(191) NOT NULL DEFAULT '',
    `status` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`operId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysDictType` (
    `dictId` INTEGER NOT NULL AUTO_INCREMENT,
    `dictName` VARCHAR(191) NOT NULL DEFAULT '',
    `dictType` VARCHAR(191) NOT NULL DEFAULT '',
    `status` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,

    UNIQUE INDEX `SysDictType_dictType_key`(`dictType`),
    PRIMARY KEY (`dictId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysDictData` (
    `dictCode` BIGINT NOT NULL AUTO_INCREMENT,
    `dictSort` INTEGER NOT NULL DEFAULT 0,
    `dictLabel` VARCHAR(191) NOT NULL DEFAULT '',
    `dictValue` VARCHAR(191) NOT NULL DEFAULT '',
    `dictType` VARCHAR(191) NOT NULL DEFAULT '',
    `status` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`dictCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysConfig` (
    `configId` INTEGER NOT NULL AUTO_INCREMENT,
    `configName` VARCHAR(191) NOT NULL DEFAULT '',
    `configKey` VARCHAR(191) NOT NULL DEFAULT '',
    `configValue` VARCHAR(191) NOT NULL DEFAULT '',
    `configType` VARCHAR(191) NOT NULL DEFAULT '',
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`configId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysLogininfor` (
    `infoId` BIGINT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL DEFAULT '',
    `ipaddr` VARCHAR(191) NOT NULL DEFAULT '',
    `loginLocation` VARCHAR(191) NOT NULL DEFAULT '',
    `browser` VARCHAR(191) NOT NULL DEFAULT '',
    `os` VARCHAR(191) NOT NULL DEFAULT '',
    `status` INTEGER NOT NULL DEFAULT 1,
    `msg` VARCHAR(191) NOT NULL DEFAULT '',
    `loginTime` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`infoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SysNotice` (
    `noticeId` INTEGER NOT NULL AUTO_INCREMENT,
    `noticeTitle` VARCHAR(191) NOT NULL,
    `noticeType` VARCHAR(191) NOT NULL,
    `noticeContent` VARCHAR(191) NOT NULL,
    `noticeReaded` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` VARCHAR(191) NULL,
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`noticeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `uname` VARCHAR(191) NOT NULL,
    `fansNum` INTEGER NOT NULL DEFAULT 0,
    `speakNum` INTEGER NOT NULL DEFAULT 0,
    `fa` VARCHAR(191) NULL DEFAULT '/img/avatar.webp',
    `sign` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `jointime` INTEGER NOT NULL DEFAULT 0,
    `moral` INTEGER NOT NULL DEFAULT 0,
    `silence` INTEGER NOT NULL DEFAULT 0,
    `fans_badge` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFansModal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserFansModal_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserOfficial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,

    UNIQUE INDEX `UserOfficial_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `role` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT '#FB7299',

    UNIQUE INDEX `UserVip_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` VARCHAR(191) NOT NULL,
    `roomOwnerUid` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `parentAreaName` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `userCover` VARCHAR(191) NOT NULL,
    `keyframe` VARCHAR(191) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `areaName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Room_roomId_key`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Live` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `fans` INTEGER NOT NULL DEFAULT 0,
    `entryNum` INTEGER NOT NULL DEFAULT 0,
    `speakNum` INTEGER NOT NULL DEFAULT 0,
    `likeNum` INTEGER NOT NULL DEFAULT 0,
    `redNoticeNum` INTEGER NOT NULL DEFAULT 0,
    `fansClub` INTEGER NOT NULL DEFAULT 0,
    `giftNum` INTEGER NOT NULL DEFAULT 0,
    `followNum` INTEGER NOT NULL DEFAULT 0,
    `unfollowNum` INTEGER NOT NULL DEFAULT 0,
    `date` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Live_roomId_date_key`(`roomId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Speak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `giftId` INTEGER NOT NULL,
    `giftName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Gift_giftId_key`(`giftId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SendGift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `giftId` INTEGER NOT NULL,
    `giftName` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RedNotice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` VARCHAR(191) NOT NULL,
    `redNoticeTag` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `UserEntry_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDanmu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `UserDanmu_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCaptain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `UserCaptain_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `UserLike_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `UserGift_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `favor` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `UserFavor_uid_roomId_key`(`uid`, `roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `optionName` VARCHAR(191) NOT NULL,
    `optionValue` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Options_optionName_key`(`optionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SysUser` ADD CONSTRAINT `SysUser_sysDeptDeptId_fkey` FOREIGN KEY (`sysDeptDeptId`) REFERENCES `SysDept`(`deptId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SysPost` ADD CONSTRAINT `SysPost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `SysUser`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLog` ADD CONSTRAINT `UserLog_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLog` ADD CONSTRAINT `UserLog_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFansModal` ADD CONSTRAINT `UserFansModal_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOfficial` ADD CONSTRAINT `UserOfficial_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVip` ADD CONSTRAINT `UserVip_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Live` ADD CONSTRAINT `Live_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Speak` ADD CONSTRAINT `Speak_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Speak` ADD CONSTRAINT `Speak_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SendGift` ADD CONSTRAINT `SendGift_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SendGift` ADD CONSTRAINT `SendGift_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RedNotice` ADD CONSTRAINT `RedNotice_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEntry` ADD CONSTRAINT `UserEntry_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEntry` ADD CONSTRAINT `UserEntry_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDanmu` ADD CONSTRAINT `UserDanmu_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDanmu` ADD CONSTRAINT `UserDanmu_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCaptain` ADD CONSTRAINT `UserCaptain_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCaptain` ADD CONSTRAINT `UserCaptain_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLike` ADD CONSTRAINT `UserLike_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLike` ADD CONSTRAINT `UserLike_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGift` ADD CONSTRAINT `UserGift_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGift` ADD CONSTRAINT `UserGift_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavor` ADD CONSTRAINT `UserFavor_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavor` ADD CONSTRAINT `UserFavor_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;
