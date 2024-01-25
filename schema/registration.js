const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
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
    password: {
        type: String
    },
    mobile_no: {
        type: String
    },
    user_semester: {
        type: String
    },
    user_branch: {
        type: String
    },
    events: {
        type: Array
    },
    dateField: {
        type: Date,
        default: Date.now,
        required: true,
        auto: true,
      }
})




const userModel = mongoose.model("user_info", UserSchema)


module.exports = userModel;
