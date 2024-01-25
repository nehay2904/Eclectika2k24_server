const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    domain:{
        type: String
    },
    branch:{
        type: String
    },
    email:{
        type:String
    },
    merch_url:{
        type:String
    }
})




const teamModel = mongoose.model("team", UserSchema)


module.exports = teamModel;