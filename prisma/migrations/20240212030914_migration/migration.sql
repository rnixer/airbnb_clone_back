-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `modile` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propertys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `nightly_price` VARCHAR(191) NOT NULL,
    `num_guests` INTEGER NULL,
    `image` VARCHAR(191) NULL,
    `is_available` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `propertys_property_name_key`(`property_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkin_date` DATE NOT NULL,
    `checkin_out` DATE NOT NULL,
    `nightly_price` INTEGER NOT NULL,
    `total_price` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `property_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `propertys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
