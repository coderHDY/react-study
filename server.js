const express = require("express");
const app = express();
app.use("/", express.static("build"));
app.use("/static", express.static("static"));
const port = 8088;

// websocket代码
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8089 }); // 监听版本号变化事件
setInterval(() => {
  const version = "1.0.1";
  wss.clients.forEach((client) => {
    client.send(version); // 向客户端发送版本号
  });
}, 6000); // 每分钟检查一次版本 // 客户端代码

app.listen(port, () => {
  console.log(`search-motion-docs listening at ${port}`);
});
