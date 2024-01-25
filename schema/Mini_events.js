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
    desc: {
        type: String
    }
})




const eventsModel = mongoose.model("events", UserSchema)


module.exports = eventsModel;