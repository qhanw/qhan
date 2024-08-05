---
title: 如何在 Nginx 中使用 Websocket
date: 2024-08-05T20:08:56+08:00
category: websocket
tags: [websocket, js, nginx]
draft: true
---

## 开始

启用 HTTP/1.1：WebSocket 需要 HTTP/1.1 协议支持，因此需要确保 Nginx 配置中使用了 proxy_http_version 1.1;。

配置 upstream：定义一个 upstream 块来指定 WebSocket 服务的后端地址。

设置正确的请求头：在 location 块中，需要设置 Upgrade 和 Connection 头，以便将 HTTP 连接升级到 WebSocket 连接。

调整超时设置：由于 WebSocket 连接可能长时间没有数据传输，需要调整 proxy_read_timeout 来避免连接超时。

以下是一个基本的 Nginx 配置 WebSocket 的示例：

```nginx
http {
    # 自定义变量，根据请求的 Upgrade 头部值来设置
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    upstream websocket {
        server ip1:port1;
        server ip2:port2;
        keepalive 1000;
    }

    server {
        listen 80;

        location /ws/ {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_pass http://websocket;

            # 设置 WebSocket 连接的超时时间
            proxy_read_timeout 3600s;
        }
    }
}
```


在这个配置中：

map 指令用于根据 $http_upgrade 的值设置 $connection_upgrade。

upstream 定义了 WebSocket 服务的后端服务器。

server 块中的 listen 指定了 Nginx 监听的端口。

location /ws/ 定义了 WebSocket 请求的路由。

proxy_http_version 1.1; 确保使用 HTTP/1.1，它支持 WebSocket。

proxy_set_header 设置了请求头，以便正确地进行协议升级。

proxy_pass 指定了 WebSocket 请求转发到的 upstream。

请注意，如果 WebSocket 服务运行在 TLS 之上，即使用 wss://，那么需要使用 HTTPS 的配置，并且确保 Nginx 配置了 SSL 模块。

如果 Nginx 作为反向代理并且 WebSocket 服务运行在不同的服务器上，还需要确保配置了正确的 proxy_set_header 指令来传递客户端的 IP 地址和其他可能需要的头信息。

确保了 WebSocket 握手和数据传输能够通过 Nginx 成功进行。如果遇到 WebSocket 连接中断的问题，可能需要调整 proxy_read_timeout 或者通过定期发送心跳包来保持连接.


## 异常处理

1. DOMException: Failed to construct 'WebSocket': The URL '/wss/landWsConnect' is invalid. ![alt text](/images/posts/nginx-websocket-error.png)

