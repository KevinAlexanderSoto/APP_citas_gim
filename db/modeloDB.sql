CREATE DATABASE databasename;
use bilecef1ot7xfqd9tfil;

CREATE TABLE IF NOT EXISTS Clientes (
client_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT ,
client_name VARCHAR(40) NOT NULL,
num_identidad INT(20) NOT NULL UNIQUE,
pass_client VARCHAR(100) NOT NULL,
tel INTEGER ,
carrera_id  INTEGER UNSIGNED,
email VARCHAR (100) NOT NULL UNIQUE,
activo TINYINT(1) NOT NULL DEFAULT 1,
rol  ENUM('ES','EG','AD','TR') NOT NULL
);

CREATE TABLE IF NOT EXISTS Citas (
cita_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
client_id INTEGER UNSIGNED,
fecha DATE NOT NULL,
hora_id INTEGER UNSIGNED  

);

CREATE TABLE IF NOT EXISTS Horas(
hora_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
hora_incio TIME NOT NULL,
hora_final TIME 
);

CREATE TABLE IF NOT EXISTS Clases (
clase_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre_clase VARCHAR(200) NOT NULL,
hora_id INTEGER UNSIGNED,
dia ENUM('L','M','MM','J','V','S')
);

CREATE TABLE IF NOT EXISTS Carreras (
    carrera_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_carrera VARCHAR(100),
    tipo ENUM('PRO','TECN','EGRE','TRAB')
);

ALTER TABLE `bilecef1ot7xfqd9tfil`.`Clases` 
ADD INDEX `fc_hora_idx` (`hora_id` ASC) VISIBLE;

ALTER TABLE `bilecef1ot7xfqd9tfil`.`Clases` 
ADD CONSTRAINT `fc_hora`
  FOREIGN KEY (`hora_id`)
  REFERENCES `bilecef1ot7xfqd9tfil`.`Horas` (`hora_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  ALTER TABLE `bilecef1ot7xfqd9tfil`.`Clientes` 
ADD INDEX `fc_carrera_idx` (`carrera_id` ASC) VISIBLE;
;
ALTER TABLE `bilecef1ot7xfqd9tfil`.`Clientes` 
ADD CONSTRAINT `fc_carrera`
  FOREIGN KEY (`carrera_id`)
  REFERENCES `bilecef1ot7xfqd9tfil`.`Carreras` (`carrera_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  ALTER TABLE `bilecef1ot7xfqd9tfil`.`Citas` 
ADD CONSTRAINT `fc_hora_citas`
  FOREIGN KEY (`hora_id`)
  REFERENCES `bilecef1ot7xfqd9tfil`.`Horas` (`hora_id`);
  
  ALTER TABLE `bilecef1ot7xfqd9tfil`.`Citas` 
ADD CONSTRAINT `fc_client`
  FOREIGN KEY (`client_id`)
  REFERENCES `bilecef1ot7xfqd9tfil`.`Clientes` (`client_id`);


  INSERT INTO Carreras (nombre_carrera,tipo)
VALUES ('SICOLOGIA','PRO'),
		('DERECHO','PRO'),
        ('INGENIERIA_ELECTRONICA','PRO'),
        ('EGRESADO','EGRE'),
        ('EMPLEADO','TRAB');

     INSERT INTO Horas(hora_incio,hora_final)
  VALUES('6:00','7:30'),
  ('8:00','9:30'),
  ('10:00','11:30'),
  ('12:00','1:30');

 SELECT * FROM Horas;
  SELECT * FROM Carreras;
  SELECT * FROM Clientes;
  SELECT * FROM Clases;
  SELECT * FROM Citas;

  desc Clientes;
  desc Carreras;
  DESC Citas;
  
 INSERT INTO Clientes(client_name,num_identidad,pass_client,carrera_id,email,rol) 
 VALUES ('KEVIN ALEXANDER' ,1287354,'123456p',3,'kevin@kevin.com','ES');

 SELECT * FROM Clientes 
 JOIN Carreras
 ON Clientes.carrera_id = Carreras.carrera_id
 where Clientes.rol = 'ES'; 

 INSERT INTO Clases(nombre_clase,hora_id,dia)
  VALUES('funcional','2','L');

  INSERT INTO Citas(client_id,fecha,hora_id)
  VALUES('1','2021-12-10','2');