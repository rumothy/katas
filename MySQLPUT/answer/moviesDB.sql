DROP DATABASE IF EXISTS moviesDB;
CREATE DATABASE moviesDB;

USE moviesDB;

CREATE TABLE movies(
    id int AUTO_INCREMENT NOT NULL,
    title varchar(30) NOT NULL,
    rating varchar(10),
    PRIMARY KEY (id)
);

INSERT INTO movies (id, title, rating)
VALUES (1, 'movie 1', 'R');

INSERT INTO movies (id, title, rating)
VALUES (2, 'movie 2', 'G');

INSERT INTO movies (id, title, rating)
VALUES (3, 'movie 3', 'PG13');