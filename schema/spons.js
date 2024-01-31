const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    spons_url: {
        type: String
    }
})




const sponsModel = mongoose.model("spons", UserSchema)


module.exports = sponsModel;