// This is a simple Express server setup
// It listens on port 3000 and logs a message when the server starts    
const express = require("express");
const app = express();
// app.use((req,res) => {
//   res.send("Hello, World!");
// });

app.get("/user", (req, res) => {
  res.send({firstName: "John", lastName: "Doe"});
});
app.post("/user", (req, res) => {
  res.send({message: "User created successfully!"});
}); 

app.use("/tasks", (req,res) => {
  res.send("Hello, Tasks !");

});
app.get("/getUserData", (req, res) => {
  try {
    // Simulate an error
    throw new Error("Simulated error");
    res.send("user data saved successfully");  
  } catch (error) {
   res.send("Error occurred while saving user data");
  }
  
});
app.use("/",(req, res) => {
  if(err){
  res.status(404).send("404 Not Found");
  }
  
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});