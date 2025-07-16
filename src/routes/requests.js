const express = require("express");
const{ userAuth } = require("../middlewares/auth.js"); 

const requestsRouter = express.Router();
const User = require("../models/user.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");   

requestsRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const allowedStatuses = ["ignored", "interested"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400)
      .json({ message: "Invalid status type" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or:[
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
        ],
        
    });
    if (existingConnectionRequest) {
        return res.status(400).json({
            message: "Connection request already exists between these users",
        });
    }
    


    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: "Connection request sent successfully",
      data,
    });
  } catch (error) {
    console.error("Error sending connection request:", error);
    res.status(500).send("Internal server error");
  }
});



 module.exports = requestsRouter;