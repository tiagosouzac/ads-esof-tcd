-- Active: 1746109071317@@127.0.0.1@3306@project_manager
CREATE DATABASE IF NOT EXISTS shadow_project_manager;

GRANT ALL PRIVILEGES ON shadow_project_manager.* TO 'local_user'@'%';

FLUSH PRIVILEGES;
