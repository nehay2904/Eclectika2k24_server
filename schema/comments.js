const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    user_name: {
        type: String
    },

    user_email: {
        type: String
    },
    
    comments: {
        type: String
    },
    dateField: {
        type: Date,
        default: Date.now,
        required: true,
        auto: true,
      }
})




const commentModel = mongoose.model("comment_info", userSchema)


module.exports = commentModel;
