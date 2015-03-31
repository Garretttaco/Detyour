
DROP DATABASE IF EXISTS detyour;

CREATE DATABASE detyour;

USE detyour;

CREATE TABLE user (
user_id INT auto_increment PRIMARY KEY,
first_name varchar(255),
email varchar(255),
password char(255),
remember_token varchar(255),
created_at datetime,
updated_at datetime 
);

INSERT INTO user (email, password, first_name, created_at, updated_at)
VALUES ('garretttacoronte@gmail.com', 'password', 'garrett', NOW(), NOW());
INSERT INTO user (email, password, first_name, created_at, updated_at)
VALUES ('bossman@gmail.com', 'password', 'boss', NOW(), NOW());

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

INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('1', '1', 'In-N-Out Burger');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('1', '1', 'Paradise Bakery & Cafe');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('2', '2', 'Shell');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('2', '2', 'Circle K');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('1', '3', 'Arizona State University Art Museum');
INSERT INTO user_preference ( user_id, category_id, preference_name) VALUES ('1', '3', 'Big Surf Waterpark');
