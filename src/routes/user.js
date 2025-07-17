const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth.js');
const ConnectionRequestModel = require('../models/connectionRequest.js');
const User = require('../models/user.js');

// Get user details
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try{
        const loggedInUserId = req.user;

        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUserId,
            status:"interested",
        }).populate('fromUserId', 'firstName lastName email'); // Populate fromUserId with user details

        res.json({
            message: "Connection requests fetched successfully",
            data: connectionRequests
        });
    } catch (error) {
        console.error("Error fetching connection requests:", error);
        res.status(400).send("Internal server error");
    }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try{
        const loggedInUserId = req.user;
        const connectionsRequests = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id,status: "accepted" },
                { toUserId: loggedInUser._id, status: "interested" },
            ],
        }).populate('fromUserId', 'firstName lastName email').populate('toUserId', 'firstName lastName email'); // Populate fromUserId with user details
     const data = connectionsRequests.map(row => {
        if (row.toUserId._id.toString() === loggedInUserId._id.toString()) {
           return row.toUserId;
        }

        return row.fromUserId;
    });


        res.json({
            message: "Connection requests fetched successfully",
            data: connectionsRequests
        });
    } catch (error) {
        console.error("Error fetching user connections:", error);

        res.status(400).send("Internal server error");
    }
});

 userRouter.get("/feed",userAuth,async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        limit  = limit>50 ? 50:limit;
        const skip = (page - 1) * limit;

        const loggedInUserId = req.user;
const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUserId},
                { fromUserId: loggedInUserId },
            ],
        }).select(fromUserId, toUserId);
      const hideUsersFromFeed = new Set();
      connectionRequests.forEach(request => {
        hideUsersFromFeed.add(request.fromUserId.toString());
        hideUsersFromFeed.add(request.toUserId.toString());
      });
 const users = await User.find({
           $and: [
            {_id: { $nin: Array.from(hideUsersFromFeed) }},
            { _id: { $ne: loggedInUserId } },
           ],
        }).select('firstName lastName').skip(skip).limit(limit); // Select fields to return
        // TODO: Implement logic for hideUsersFromFeed and response
   res.json({data: users});
    }

    catch (error) {
        console.error("Error fetching feed:", error);
        res.status(400).send("Internal server error");
    }
});

module.exports = userRouter;



