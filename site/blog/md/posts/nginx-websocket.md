---
title: Nginx 配置 WebSocket 反向代理
date: 2024-08-05T20:08:56+08:00
category: websocket
tags: [websocket, js, nginx]
description: 解决 WebSocket 在 Nginx 下无法正常连接问题，以及配置 Nginx 过程中需要注意的问题和 Websocket 地址在不同浏览器的兼容处理。
---


WebSocket 自发布以来，在 Web 中的运用越来越来多。在我们部署 WebSocket 应用时绕不开 Nginx， 那么在 nginx 中配置 Websocket 反向代理时，你会发现与我们想象中的配置写法不同。当在 nginx 配置中使用`ws://`或`wss://`协议开头的地址时，nginx 服务会启动失败。这是因为 nginx 并不支持这两个协议方式。那么要在 nginx 中使用 Websocket 该如何配置 nginx 呢？

Nginx 从`v1.3`版本开始支持 WebSocket，其支持方式是对现在 http 协议进行升级处理， 即启用 `HTTP/1.1`，并通过 HTTP 的 Upgrade 和 Connection 协议头的方式，将连接从HTTP升级为WebSocket，如下：

```nginx
# 自定义变量，根据请求的 Upgrade 头部值来设置
# 如果没有Upgrade头，则$connection_upgrade为close，否则为upgrade
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    ...
    location /ws {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # 下面这两行是关键
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

**指令解释**：

1. map 指令用于根据 $http_upgrade 的值设置 $connection_upgrade。
2. location /ws 定义了 WebSocket 请求的路由。
3. proxy_http_version 1.1; 确保使用 HTTP/1.1，它支持 WebSocket。
4. proxy_set_header 设置了请求头，以便正确地进行协议升级。
5. proxy_pass 指定了 WebSocket 请求转发到的 upstream。

> [!NOTE]
> 请注意，如果 WebSocket 服务运行在 TLS 之上，即使用 wss://，那么需要使用 HTTPS 的配置，并且确保 Nginx 配置了 SSL 模块。
>
> 如果 Nginx 作为反向代理并且 WebSocket 服务运行在不同的服务器上，还需要确保配置了正确的 proxy_set_header 指令来传递客户端的 IP 地址和其他可能需要的头信息。


## 多个后端服务器

如果有多个后端服务器，则可以使用 upstream 定义多个后端服务器，并在 location 中使用 proxy_pass 指定后端服务器即可：
```nginx
upstream websocket {
    server ip1:port1;
    server ip2:port2;
    keepalive 1000;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    ...
    location /ws {
        proxy_pass http://websocket;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        # 下面这两行是关键
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

## 连接中断(何保持长连接)
确保了 WebSocket 握手和数据传输能够通过 Nginx 成功进行。如果遇到 WebSocket 连接中断的问题，可能需要调整 proxy_read_timeout 或者通过定期发送心跳包来保持连接。通常情况下设置`proxy_read_timeout`时间即可。

```nginx
  proxy_connect_timeout 5s;
  proxy_read_timeout 60s;
  proxy_send_timeout 30s;
```

- **proxy_read_timeout**: 默认值60秒，该指令设置与代理服务器的读超时时间。它决定了nginx会等待多长时间来获得请求的响应。这个时间不是获得整个response的时间，而是两次reading操作的时间。即是服务器对你等待最大的时间，也就是说当你使用nginx转发webSocket的时候，如果60秒内没有通讯，依然是会断开的，所以，你可以按照你的需求来设定。比如说，我设置了5分钟，那么如果我5分钟内有通讯，或者5分钟内有做心跳的话，是可以保持连接不中断的。所以这个时间是看你的业务需求来调整时间长短的。
- **proxy_send_timeout**: 默认值 60s，设置了发送请求给upstream服务器的超时时间。超时设置不是为了整个发送期间，而是在两次write操作期间。如果超时后，upstream没有收到新的数据，nginx会关闭连接。

## 异常处理

### 地址未写全

当在使用 Websocket 时，在地址未写全时，即只写了`uri`的情况下，可能会出现如下错误，这是因为在前端使用的 Websocket 库，有的会自动补全地址，有的则不会。另外部分浏览器的新版本对只有 uri 的情况下也会兼容处理。主要表现为，在谷歌浏览器v126版本之前就会报该错误，之后版本则不会。解决方法为补全 Websocket 连接地址。
```plaintext
DOMException: Failed to construct 'WebSocket': The URL '/wss/landWsConnect' is invalid.
```
![alt text](/images/posts/nginx-websocket-error.png)



**解决方案**
```ts
const wsAddress = `ws://${window.location.host}/wss/landWsConnect`
```
