create database acnhvillagers_db;
use acnhvillagers_db;

CREATE TABLE villagers
(
	id int NOT NULL AUTO_INCREMENT,
	villager_name varchar(255) NOT NULL,
	dreamy BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);