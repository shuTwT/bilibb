-- CreateTable
CREATE TABLE `sys_dept` (
    `dept_id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NOT NULL DEFAULT 0,
    `ancestors` VARCHAR(191) NOT NULL DEFAULT '',
    `dept_name` VARCHAR(191) NOT NULL DEFAULT '',
    `sort` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 1,
    `leader` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `del_flag` BOOLEAN NOT NULL DEFAULT false,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`dept_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `dept_id` INTEGER NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `nick_name` VARCHAR(191) NOT NULL,
    `user_type` VARCHAR(191) NOT NULL DEFAULT '00',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `phonenumber` VARCHAR(191) NOT NULL DEFAULT '',
    `sex` INTEGER NOT NULL DEFAULT 0,
    `avatar` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `login_ip` VARCHAR(191) NOT NULL DEFAULT '',
    `login_date` VARCHAR(191) NULL,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `del_flag` BOOLEAN NOT NULL DEFAULT false,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_post` (
    `post_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_code` VARCHAR(191) NOT NULL,
    `post_name` VARCHAR(191) NOT NULL,
    `post_sort` INTEGER NOT NULL,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `del_flag` BOOLEAN NOT NULL DEFAULT false,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,
    `role_key` VARCHAR(191) NOT NULL,
    `role_sort` INTEGER NOT NULL,
    `data_scope` VARCHAR(191) NOT NULL DEFAULT '1',
    `menu_check_strictly` BOOLEAN NOT NULL DEFAULT true,
    `dept_check_strictly` BOOLEAN NOT NULL DEFAULT true,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `del_flag` BOOLEAN NOT NULL DEFAULT false,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_menu` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NOT NULL DEFAULT 0,
    `menu_type` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `menu_name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL DEFAULT '',
    `component` VARCHAR(191) NOT NULL,
    `rank` INTEGER NULL DEFAULT 0,
    `redirect` VARCHAR(191) NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `extra_icon` VARCHAR(191) NOT NULL DEFAULT '',
    `enter_transition` VARCHAR(191) NOT NULL DEFAULT '',
    `leave_transition` VARCHAR(191) NOT NULL DEFAULT '',
    `active_path` VARCHAR(191) NOT NULL DEFAULT '',
    `auths` VARCHAR(191) NOT NULL DEFAULT '',
    `frame_src` VARCHAR(191) NOT NULL DEFAULT '',
    `frame_loading` BOOLEAN NOT NULL DEFAULT true,
    `keep_alive` BOOLEAN NOT NULL DEFAULT false,
    `frame_tag` BOOLEAN NOT NULL DEFAULT false,
    `show_link` BOOLEAN NOT NULL DEFAULT true,
    `show_parent` BOOLEAN NOT NULL DEFAULT false,
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_user_role` (
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_role_menu` (
    `role_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,

    PRIMARY KEY (`role_id`, `menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_oper_log` (
    `oper_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `method` VARCHAR(191) NOT NULL DEFAULT '',
    `request_method` VARCHAR(191) NOT NULL DEFAULT '',
    `oper_name` VARCHAR(191) NOT NULL DEFAULT '',
    `oper_url` VARCHAR(191) NOT NULL DEFAULT '',
    `oper_ip` VARCHAR(191) NOT NULL DEFAULT '',
    `status` CHAR(1) NOT NULL DEFAULT '0',

    PRIMARY KEY (`oper_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dict_type` (
    `dict_id` INTEGER NOT NULL AUTO_INCREMENT,
    `dict_name` VARCHAR(191) NOT NULL DEFAULT '',
    `dict_type` VARCHAR(191) NOT NULL DEFAULT '',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    UNIQUE INDEX `sys_dict_type_dict_type_key`(`dict_type`),
    PRIMARY KEY (`dict_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_dict_data` (
    `dict_code` INTEGER NOT NULL AUTO_INCREMENT,
    `dict_sort` INTEGER NOT NULL DEFAULT 0,
    `dict_label` VARCHAR(191) NOT NULL DEFAULT '',
    `dict_value` VARCHAR(191) NOT NULL DEFAULT '',
    `dict_type` VARCHAR(191) NOT NULL DEFAULT '',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`dict_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_config` (
    `config_id` INTEGER NOT NULL AUTO_INCREMENT,
    `config_name` VARCHAR(191) NOT NULL DEFAULT '',
    `config_key` VARCHAR(191) NOT NULL DEFAULT '',
    `config_value` VARCHAR(500) NOT NULL DEFAULT '',
    `config_type` VARCHAR(191) NOT NULL DEFAULT '1',
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`config_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_logininfor` (
    `info_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL DEFAULT '',
    `ipaddr` VARCHAR(191) NOT NULL DEFAULT '',
    `login_location` VARCHAR(191) NOT NULL DEFAULT '',
    `browser` VARCHAR(191) NOT NULL DEFAULT '',
    `os` VARCHAR(191) NOT NULL DEFAULT '',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `msg` VARCHAR(191) NOT NULL DEFAULT '',
    `login_time` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`info_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sys_notice` (
    `notice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `notice_title` VARCHAR(191) NOT NULL,
    `notice_type` VARCHAR(191) NOT NULL,
    `notice_content` VARCHAR(191) NOT NULL,
    `notice_readed` VARCHAR(191) NOT NULL DEFAULT '0',
    `status` CHAR(1) NOT NULL DEFAULT '0',
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`notice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gen_table` (
    `table_id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_name` VARCHAR(191) NOT NULL DEFAULT '',
    `table_comment` VARCHAR(191) NOT NULL DEFAULT '',
    `sub_table_name` VARCHAR(191) NOT NULL DEFAULT '',
    `sub_table_fk_name` VARCHAR(191) NOT NULL DEFAULT '',
    `class_name` VARCHAR(191) NOT NULL DEFAULT '',
    `tpl_category` VARCHAR(191) NOT NULL DEFAULT '',
    `tpl_web_type` VARCHAR(191) NOT NULL DEFAULT '',
    `package_name` VARCHAR(191) NOT NULL DEFAULT '',
    `module_name` VARCHAR(191) NOT NULL DEFAULT '',
    `business_name` VARCHAR(191) NOT NULL DEFAULT '',
    `function_name` VARCHAR(191) NOT NULL DEFAULT '',
    `function_author` VARCHAR(191) NOT NULL DEFAULT '',
    `gen_type` CHAR(1) NOT NULL DEFAULT '',
    `gen_path` VARCHAR(191) NOT NULL DEFAULT '',
    `options` VARCHAR(191) NOT NULL DEFAULT '',
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`table_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gen_table_column` (
    `column_id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_id` INTEGER NOT NULL,
    `column_name` VARCHAR(191) NOT NULL,
    `column_coment` VARCHAR(191) NOT NULL,
    `column_type` VARCHAR(191) NOT NULL,
    `java_type` VARCHAR(191) NOT NULL,
    `java_field` VARCHAR(191) NOT NULL,
    `is_pk` CHAR(1) NOT NULL,
    `is_increment` CHAR(1) NOT NULL,
    `is_required` CHAR(1) NOT NULL,
    `is_insert` CHAR(1) NOT NULL,
    `is_edit` CHAR(1) NOT NULL,
    `is_list` CHAR(1) NOT NULL,
    `is_query` CHAR(1) NOT NULL,
    `query_type` VARCHAR(191) NOT NULL DEFAULT 'EQ',
    `html_type` VARCHAR(191) NOT NULL,
    `dict_type` VARCHAR(191) NOT NULL,
    `sort` INTEGER NOT NULL,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,
    `remark` VARCHAR(500) NULL,

    PRIMARY KEY (`column_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `uname` VARCHAR(191) NOT NULL,
    `fans_num` INTEGER NOT NULL DEFAULT 0,
    `speak_num` INTEGER NOT NULL DEFAULT 0,
    `fa` VARCHAR(191) NULL DEFAULT '/img/avatar.webp',
    `sign` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `jointime` INTEGER NOT NULL DEFAULT 0,
    `moral` INTEGER NOT NULL DEFAULT 0,
    `silence` INTEGER NOT NULL DEFAULT 0,
    `fans_badge` BOOLEAN NOT NULL DEFAULT false,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `user_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

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
CREATE TABLE `room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` VARCHAR(191) NOT NULL,
    `room_owner_uid` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `parent_area_name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `user_cover` VARCHAR(191) NOT NULL,
    `keyframe` VARCHAR(191) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `area_name` VARCHAR(191) NOT NULL,
    `active` CHAR(1) NOT NULL DEFAULT '0',
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `room_room_id_key`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `live` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `fans` INTEGER NOT NULL DEFAULT 0,
    `entry_num` INTEGER NOT NULL DEFAULT 0,
    `speak_num` INTEGER NOT NULL DEFAULT 0,
    `like_num` INTEGER NOT NULL DEFAULT 0,
    `red_notice_num` INTEGER NOT NULL DEFAULT 0,
    `fans_club` INTEGER NOT NULL DEFAULT 0,
    `gift_num` INTEGER NOT NULL DEFAULT 0,
    `follow_num` INTEGER NOT NULL DEFAULT 0,
    `unfollow_num` INTEGER NOT NULL DEFAULT 0,
    `date` VARCHAR(191) NOT NULL,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `live_room_id_date_key`(`room_id`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `speak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gift_id` INTEGER NOT NULL,
    `gift_name` VARCHAR(191) NOT NULL,
    `gift_price` DOUBLE NOT NULL DEFAULT 0,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `gift_gift_id_key`(`gift_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `send_gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `gift_id` INTEGER NOT NULL,
    `gift_name` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `red_notice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` VARCHAR(191) NOT NULL,
    `red_notice_tag` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_entry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `user_entry_uid_room_id_key`(`uid`, `room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_danmu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `user_danmu_uid_room_id_key`(`uid`, `room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_captain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `user_captain_uid_room_id_key`(`uid`, `room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `user_like_uid_room_id_key`(`uid`, `room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `first` VARCHAR(191) NULL,
    `latest` VARCHAR(191) NULL,
    `num` INTEGER NOT NULL DEFAULT 1,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `user_gift_uid_room_id_key`(`uid`, `room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_favor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `favor` INTEGER NOT NULL DEFAULT 0,
    `create_by` VARCHAR(191) NOT NULL DEFAULT '',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_by` VARCHAR(191) NOT NULL DEFAULT '',
    `update_time` DATETIME(3) NULL,

    UNIQUE INDEX `user_favor_uid_room_id_key`(`uid`, `room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sys_user` ADD CONSTRAINT `sys_user_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept`(`dept_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sys_post` ADD CONSTRAINT `sys_post_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `sys_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gen_table_column` ADD CONSTRAINT `gen_table_column_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `gen_table`(`table_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_log` ADD CONSTRAINT `user_log_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_log` ADD CONSTRAINT `user_log_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_fans_modal` ADD CONSTRAINT `user_fans_modal_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_official` ADD CONSTRAINT `user_official_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_vip` ADD CONSTRAINT `user_vip_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `live` ADD CONSTRAINT `live_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `speak` ADD CONSTRAINT `speak_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `speak` ADD CONSTRAINT `speak_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `send_gift` ADD CONSTRAINT `send_gift_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `send_gift` ADD CONSTRAINT `send_gift_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `red_notice` ADD CONSTRAINT `red_notice_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_entry` ADD CONSTRAINT `user_entry_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_entry` ADD CONSTRAINT `user_entry_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_danmu` ADD CONSTRAINT `user_danmu_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_danmu` ADD CONSTRAINT `user_danmu_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_captain` ADD CONSTRAINT `user_captain_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_captain` ADD CONSTRAINT `user_captain_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_like` ADD CONSTRAINT `user_like_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_like` ADD CONSTRAINT `user_like_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_gift` ADD CONSTRAINT `user_gift_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_gift` ADD CONSTRAINT `user_gift_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor` ADD CONSTRAINT `user_favor_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor` ADD CONSTRAINT `user_favor_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
