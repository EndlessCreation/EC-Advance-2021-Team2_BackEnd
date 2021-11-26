-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account` VARCHAR(20),
    `email` VARCHAR(20) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `nickname` VARCHAR(15) NOT NULL,
    `oauth` VARCHAR(191),
    `password` VARCHAR(100),
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3),
    `isAdmin` INTEGER NOT NULL DEFAULT 0,
    `phone_number` VARCHAR(50),

    UNIQUE INDEX `user.account_unique`(`account`),
    UNIQUE INDEX `user.email_unique`(`email`),
    UNIQUE INDEX `user.nickname_unique`(`nickname`),
    UNIQUE INDEX `user.phone_number_unique`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3),
    `isFavorite` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,
    `tag_id` INTEGER,
    `keyword_id` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `post_id` INTEGER,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `image.post_id_unique`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(20) NOT NULL,
    `tag_color` VARCHAR(191) NOT NULL DEFAULT 'gray',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `author_id` INTEGER NOT NULL,

    UNIQUE INDEX `author_id_tag`(`author_id`, `tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keyword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `keyword_name` VARCHAR(191) NOT NULL,
    `keyword_color` VARCHAR(191) NOT NULL DEFAULT 'gray',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `parent_tag_id` INTEGER NOT NULL,

    UNIQUE INDEX `parent_tag_id_keyword_name`(`parent_tag_id`, `keyword_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD FOREIGN KEY (`keyword_id`) REFERENCES `keyword`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tag` ADD FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `keyword` ADD FOREIGN KEY (`parent_tag_id`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
