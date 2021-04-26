CREATE TABLE `personal_manager`.`users` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `personal_manager`.`operations` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `user_id` INT NOT NULL,
    `category_id` INT NOT NULL,
    `amount` FLOAT NOT NULL,
    `commentary` VARCHAR(255) NOT NULL,
    `type` VARCHAR(1) NOT NULL,
    `date` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `personal_manager`.`categories` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `icon` VARCHAR(255) NOT NULL,
    `color` VARCHAR(255) NOT NULL,
    `type` VARCHAR(1) NOT NULL,
    PRIMARY KEY (`id`)
);