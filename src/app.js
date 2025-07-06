// This is a simple Express server setup
// It listens on port 3000 and logs a message when the server starts    
const express = require("express");
const app = express();
app.use((req,res) => {
  res.send("Hello, World!");
});
app.use("/tasks", (req,res) => {
  res.send("Hello, Tasks !");
});
app.use("/tasks1", (req,res) => {
  res.send("Hello, Tasks131131 !");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
