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
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`table_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gen_table_column` (
    `columnId` INTEGER NOT NULL AUTO_INCREMENT,
    `tableId` INTEGER NOT NULL,
    `columnName` VARCHAR(191) NOT NULL,
    `columnComent` VARCHAR(191) NOT NULL,
    `columnType` VARCHAR(191) NOT NULL,
    `javaType` VARCHAR(191) NOT NULL,
    `javaField` VARCHAR(191) NOT NULL,
    `isPk` CHAR(1) NOT NULL,
    `isIncrement` CHAR(1) NOT NULL,
    `isRequired` CHAR(1) NOT NULL,
    `isInsert` CHAR(1) NOT NULL,
    `isEdit` CHAR(1) NOT NULL,
    `isList` CHAR(1) NOT NULL,
    `isQuery` CHAR(1) NOT NULL,
    `queryType` VARCHAR(191) NOT NULL DEFAULT 'EQ',
    `htmlType` VARCHAR(191) NOT NULL,
    `dictType` VARCHAR(191) NOT NULL,
    `sort` INTEGER NOT NULL,
    `createBy` VARCHAR(191) NOT NULL DEFAULT '',
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL DEFAULT '',
    `updateTime` DATETIME(3) NULL,
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`columnId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
