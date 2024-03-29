const ws = new WebSocket("ws://localhost:8089");
console.log(ws);
ws.addEventListener("open", function () {
  console.log("用websocket与服务器建立连接...");
});

ws.addEventListener("message", (event) => {
  console.log(event);
  // 显示更新提示
  const showRefreshMessage = window.confirm(
    "A new version of the application is available. Do you want to refresh now?"
  ); // 刷新页面以加载最新版本
  if (showRefreshMessage) {
    window.location.reload();
  }
});
