---
title: "Learn Laravel 9 From Scratch - Build CRUD | #2 Config Project, Create Model, Controller, and Resources"
date: 2022-10-11T16:57:33+07:00
draft: true
ShowBreadCrumbs: true
cover:
    image: img/2.png
    alt: 'This is a post image'
    caption: 'This is the caption'
    linkFullImages: true
    responsiveImages: false
    relative: false
# tags: ["html", "css"]
categories: ["laravel"]
---
In this article, we will learn how to config database, create model, migration, controller, and resources. And also explaination about that. 
### 1 - Create Model
Open new terminal on your project (laravel-api-blog) (you can open new terminal using Ctrl+Shift+`), and type: php artisan make:model Product -m.
This action will make 2 files:
1. app/Models/Product.php
2. products_table.php (in database/migrations), (we will get different name, because this generate automatically. My products migration name: 2022_11_04_103523_create_products_table.php) 
### 2 - Configure Database Connection
Open the project, search file .env
### 3 - Create Database
### 4 - Make Model and Migration
### 5 - Add Field Table
### 6 - Operate Migration
### 7 - Configure Mass Assigment
### 8 - Add Dummy Data