const mongoose = require('mongoose');   
const connectionRequestSchema = new mongoose.Schema({
fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},

toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},

 status:{
    type:String,
    required: true,
    enum:{
        values: ["ignored", "accepted", "rejected","intrested"],
        message:"{VALUE} is incorrect status type "
    },
  },
  

},
{ 
    timestamps: true

}
);
connectionRequestSchema.pre('save', function() {
    const connectionRequest = this;
    // You can add pre-save logic here if needed
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send a connection request to yourself");
    }       
    next();

});


const ConnectionRequestModel = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequestModel;
