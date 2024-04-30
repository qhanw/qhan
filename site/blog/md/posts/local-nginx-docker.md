---
title: 使用Docker快速实现Nginx服务
date: 2023-07-07T18:55:00+08:00
category: docker
tags: [js, nginx, docker]
description: 使用docker-compose为不熟练Docker，但又不太想在本地物理机上安装各种复杂的开发环境的同学，提供一个简单便利的基于docker的Nginx环境配置流程。
---

该文章旨在为不熟练`Docker`，但又不太想在本地物理机上安装各种复杂的开发环境的同学，提供一个简单便利的操作。其目的为解决以下几种情况：
- 在我们前端开发的过程中，模拟生产环境的服务配置(**主要为Nginx环境搭建**)，实现一些在非本地开发环境出现的问题Bug的排查定位(主要因频繁发版的方式来排查问题所在，出于某些原因的限制，频繁发版的行为颇为不便)，及本地自我的应用测试。
- 在我们前端同学想自己简单学习一下数据库时，又不太想在本地机器上安装庞大的数据库软件时。
- 其它一些非常用环境搭建时。

本方法主要使用`docker-compose`方式配置出基本的模版，后续新建环境，只需复制一份，现调整一些基本配置即可。同时保证在本地机器上已安装`docker`，[安装docker](https://docs.docker.com/desktop/install/mac-install/)。

### TOC

### 快速使用
太长不看，只想快速使用版：https://github.com/qhanw/docker-templates

## 开始配置
1. 新建`docker`文件夹，其它任意名称都可。
2. 在`docker`文件夹。新建容器的文件夹，并在文件夹中编写容器配置文件，目录结构如![](https://s2.loli.net/2023/09/19/ExN5djLJstwPhgI.webp)
> data为数据库资源，dist为网站应用目录，可配置到其它地址

### 容器服务配置
本文中将以`nginx`与`mongodb`为例，其它服务基本与其配置相似，具体在https://hub.docker.com/ 中找到对应的镜像服务，查看其配置。如: [mysql](https://hub.docker.com/_/mysql)
#### Nginx

1.编写`docker-compose.yaml`

```yaml 
version: "3"

services:
  nginx:
    image: nginx:1.25.1
    container_name: nginx
    restart: always
    volumes:
     # 映射配置，可配置多个
     # 本机文件地址:容器文件地址
     - ./templates:/etc/nginx/templates
     - /Users/qhan/Documents/workplace/sso-web/dist:/usr/share/nginx/html
     - /Users/qhan/Documents/workplace/oagw-web/dist:/usr/share/nginx/oagw
    ports:
     - "8080:80"
     - "8443:443"
    environment:
     - TZ=Asia/Shanghai
```
2. 编写`default.conf.template`，具体情况根据自身应用情况面定。
```nginx
server {
    listen 80;
    server_name localhost;
    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6].";

    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /oagw {
        alias /usr/share/nginx/oagw;
        # try_files $uri $uri/ /index.html;
        try_files $uri $uri/index.html index.html =404;
    }
    
    location /api {
        proxy_pass https://api.dev.xjjj.co;
        # proxy_set_header   X-Forwarded-Proto $scheme;
        # proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header    Host               $proxy_host;
        add_header          x-real-url         $scheme://$proxy_host$request_uri;
        # add_header          x-real-uri         $request_uri;
        # add_header          x-real-host        $proxy_host;
    }

    location /ping {
        return 200 'pong';
    }
}
```

#### MongoDB
1.编写`docker-compose.yaml`

```yaml
# Use root/example as user/password credentials
version: '3.1'

services:

  mongo:
    image: mongo:5.0.3
    container_name: mongoDB
    restart: always
    ports:
      - 27017:27017
    volumes:
        - ./data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  mongo-express:
    image: mongo-express:1.0.0-alpha.4
    container_name: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
      ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/
```

### 启动服务
完成上述配置后，在命令终端下打开相对应容器配置的目录，如 `cd nginx`然后根据具体情况，执行以下命令即可启动、关闭、重启服务。是不是特别简单？
> 以下命令都是独立的命令操作，并没有步骤顺序。
```bash
# -d 是 run 命令的参数，表示：后台运行容器，并返回容器 ID；
# 1. 启动容器 可不加 -d
docker compose up -d

# 2. 移除容器
docker compose down

# 3. 修改配置后需先移除容器，然后重启
docker compose down
docker compose up -d
# or
docker compose down && docker compose up -d

# 4. 重启容器
docker restart [服务名]

# 5.查看所有容器
docker ps -a
```
