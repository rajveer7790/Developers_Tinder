const mongoose = require("mongoose");

const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rajveer7790:DfDFxGXs41jfAAk0@developerstinder.acxm6ws.mongodb.net/devTinder"
  );
};

module.exports = ConnectDB;




