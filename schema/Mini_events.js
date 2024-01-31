const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    event_name: {
        type: String
    },
    event_desc: {
        type: String
    }
})




const eventsModel = mongoose.model("events", UserSchema)


module.exports = eventsModel;