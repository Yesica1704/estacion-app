CREATE DATABASE estacionapp;

USE estacionapp;

create table limits
(
    id           int auto_increment
        primary key,
    vehicle_type enum ('car', 'motorcycle') not null,
    max_spaces   int                        not null
);

create table parking_spaces
(
    id            int auto_increment
        primary key,
    vehicle_type  enum ('car', 'motorcycle')          not null,
    location      varchar(255)                        not null,
    status        enum ('occupied', 'available')      not null,
    license_plate varchar(20)                         null,
    entry_time    timestamp default CURRENT_TIMESTAMP null,
    exit_time     timestamp                           null
);

create table users
(
    id       int auto_increment
        primary key,
    username varchar(255) not null,
    password varchar(255) not null
);

INSERT INTO estacionapp.limits (id, vehicle_type, max_spaces) VALUES (1, 'car', 100);
INSERT INTO estacionapp.limits (id, vehicle_type, max_spaces) VALUES (2, 'motorcycle', 100);

INSERT INTO estacionapp.users (id, username, password) VALUES (1, 'testuser', 'testpass');
INSERT INTO estacionapp.users (id, username, password) VALUES (2, 'yesica@gmail.com', '123456');
INSERT INTO estacionapp.users (id, username, password) VALUES (3, 'wronguser', 'wrongpass');


