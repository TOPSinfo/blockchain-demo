const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LandSchema = new Schema({
    landName:{
        type: String,
        required: true },
    currentOwner :{
        type: String,
        required: true },
    landId:{
        type: Number,
        required: true
    },
    history : [
        {
            OwnerAddress: { type: String, default:null},
            username: { type: String,default:null },
            Timestamp:{ type: Date, default: Date.now },
            reciept:{type:Object}
        }
    ]
});

module.exports = Land = mongoose.model("lands", LandSchema);
