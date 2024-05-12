---
title: Javascript 文件下载
date: 2024-05-12T20:08:56+08:00
category: js
tags: [js]
---

- 方式一
```ts
function download(url:string){
	fetch(url).then(res => res.blob().then(blob => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);   // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
      const filename = res.headers.get('Content-Disposition');
      a.href = url;
      a.download = filename ?? '';
      a.click();
      window.URL.revokeObjectURL(url);
  }
}
```
- 方式二
> XMLHttpRequest 方式可以轻松获取下载进度
```ts
function download(url: string, fileName: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    //会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
    const url = window.URL.createObjectURL(xhr.response);
    const a = document.createElement('a');

    a.href = url;
    a.download = fileName;
    a.click();
  };
  xhr.send();
}
```
