const express = require("express");
const app = express();
app.use("/", express.static("build"));
app.use("/static", express.static("static"));
const port = 8088;

app.listen(port, () => {
  console.log(`search-motion-docs listening at ${port}`);
});
