---
title: "Build Laravel 9 API - Build CRUD | #1 How to Install Laravel 9 in Windows"
date: 2022-10-11T16:52:26+07:00
draft: false
ShowBreadCrumbs: true
cover:
    image: img/1.png
    alt: 'This is a post image'
    caption: 'This is the caption'
    linkFullImages: true
    responsiveImages: false
    relative: false
# tags: ["html", "css"]
categories: ["laravel"]
---
We will start to build API project using Laravel 9, and in this article we will learn how to install laravel 9 in easy way. In this project, we will install Laravel using Laragon. We also will learn how to upload images in API using laravel 9, and simulate the data using API. We use windows 10 to build this project. 
### 1 - Install Git CLI
Download and install git from here: https://git-scm.com/. Install like usual, then search git on your machine. 
![git](https://raw.githubusercontent.com/fmuiin14/fmuiin14.github.io/d3fd5981d9247a017e111966c18037a1ccbd8c06/content/posts/images/1.git.png)
### 2 - Install Composer
Download and install composer from here: https://getcomposer.org/. After finish to install, check on your git cli, type composer.
![composer](https://raw.githubusercontent.com/fmuiin14/fmuiin14.github.io/d3fd5981d9247a017e111966c18037a1ccbd8c06/content/posts/images/2.%20composer.png)
### 3 - Install Laragon
Download and install laragon from here: https://laragon.org/. After finish to install, search on your machine and open it.
![laragon](https://raw.githubusercontent.com/fmuiin14/fmuiin14.github.io/d3fd5981d9247a017e111966c18037a1ccbd8c06/content/posts/images/3.%20laragon.png)
### 4 - Add PHP 8
Check PHP Version on your machine, make sure your PHP version >= 8. You can open your Git CLI, and type php --version. Or you can check in your laragon-> PHP-> Version.
![laragon](https://raw.githubusercontent.com/fmuiin14/fmuiin14.github.io/d3fd5981d9247a017e111966c18037a1ccbd8c06/content/posts/images/4.%20check%20php.png)
### 5 - Install Laravel 9
Open Laragon-> Start All-> (Right Click) ->  Quick app-> project_name (my laravel project name: laravel-api-blog).
Your Laravel project will automatically installed on document root laragon.
![laravel9](https://raw.githubusercontent.com/fmuiin14/fmuiin14.github.io/d3fd5981d9247a017e111966c18037a1ccbd8c06/content/posts/images/5.%20install%20laravel.png)
After finish to install project, open laravel project (laravel-api-blog) using Visual Studio Code. Open terminal, and type: php artisan serve.
(image serve)
visit http://127.0.0.1:8000/, your laravel 9 installed successfully.
(image laravel)