const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    address:{
        type:String,
        required : true,
    },
    tokenId : {
        type : Number,
        required : true,
        unique : true
    },
    tokenURI : {
        type : String,
        required : true,
    },
    
}, {timestamps : true})

module.exports = mongoose.model("nft", NFTSchema);