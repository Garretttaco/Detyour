
DROP DATABASE IF EXISTS detyour;

CREATE DATABASE detyour;

USE detyour;

CREATE TABLE user (
user_id INT auto_increment PRIMARY KEY,
email varchar(255),
password char(255),
remember_token varchar(255),
first_name varchar(255)
);

INSERT INTO user (email, password, first_name)
VALUES ('garretttacoronte@gmail.com', 'password', 'garrett');
INSERT INTO user (email, password, first_name)
VALUES ('bossman@gmail.com', 'password', 'boss');

CREATE TABLE category (
category_id INT auto_increment PRIMARY KEY,
category_name varchar(255) NOT NULL
);

INSERT INTO category (category_name) VALUES ('Restaurants');
INSERT INTO category (category_name) VALUES ('Gas Stations');
INSERT INTO category (category_name) VALUES ('Attractions');

CREATE TABLE user_preference (
user_preference_id INT auto_increment PRIMARY KEY,
user_id INT NOT NULL,
category_id INT NOT NULL,
preference_name varchar(255) NOT NULL
);

INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('1', '1', 'McDonalds');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('1', '1', 'Mimi\'s Cafe');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('2', '2', 'Shell');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('2', '2', 'Costco Gas');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('1', '3', 'Grand Canyon');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('1', '3', 'Phoenix Zoo');
