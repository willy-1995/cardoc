# syntax=docker/dockerfile:1

FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql

#all from current folder of computer
COPY . /var/www/html/

#use port 80 // default for websites
EXPOSE 80