/*INSERT USERS*/

INSERT INTO `personal_manager`.`users` (`name`, `lastname`, `email`, `password`, `img`) VALUES ('esmeralda', 'marin', 'esmemarinm03@gmail.com', 'eyJhbGciOiJIUzI1NiJ9.dG9rZW4xMjM.eDJYB2N0DXv7hNzL2hePNKrlyiQUNmI-sE_OX5Umw6A', 'imagen.png');
INSERT INTO `personal_manager`.`users` (`name`, `lastname`, `email`, `password`, `img`) VALUES ('carolina', 'gomez', 'carogomez@gmail.com', 'eyJhbGciOiJIUzI1NiJ9.Y2Fyb2dvbWV6MTIz.NJeYRvLaqbxy29lOEhPmZ0fbOx4TlrBtoOYZVS3xRUw', 'image2.png');
INSERT INTO `personal_manager`.`users` (`name`, `lastname`, `email`, `password`, `img`) VALUES ('tobias', 'perez', 'tobiasperez@gmail.com', 'eyJhbGciOiJIUzI1NiJ9.dG9iaXBlcmV6MTIz.l_LWVODe7tTq9oQPC16DojqECSQtSu0QEvVTqM74eJw', 'image3.png');

/*INSERT CATEGORIES*/

INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('family', 'family.svg', '6200FF', 'e');
INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('gift', 'gift.svg', 'FF3D43', 'e');
INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('gift', 'gift.svg', 'FF3D43', 'i');
INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('home', 'home.svg', 'E7FF00', 'e');
INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('supermarket', 'supermarket.svg', 'FF5733', 'e');
INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('restaurant', 'restaurant.svg', 'E7370B', 'e');
INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('transport', 'transport.svg', '0027FF', 'e');
INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('interest', 'interest.svg', '0004FF', 'i');
INSERT INTO `personal_manager`.`categories` (`name`, `icon`, `color`, `type`) VALUES ('salary', 'salary.svg', '18FF00', 'i');


/*INSERT OPERATIONS*/

INSERT INTO `personal_manager`.`operations` (`user_id`, `category_id`, `amount`, `commentary`, `type`, `date`) VALUES ('1', '1', '563.53', 'sin comentarios', 'e', '2021/03/05');
INSERT INTO `personal_manager`.`operations` (`user_id`, `category_id`, `amount`, `commentary`, `type`, `date`) VALUES ('1', '2', '589.60', 'regalo de cumpleanios', 'e', '2021/04/26');
INSERT INTO `personal_manager`.`operations` (`user_id`, `category_id`, `amount`, `commentary`, `type`, `date`) VALUES ('1', '9', '15600', 'salario de trabajo mes marzo', 'i', '2021/04/04');
