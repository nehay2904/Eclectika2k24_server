

const mongoose = require('mongoose')


const MerchSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    merch_name: {
        type: String
    },

    merch_email: {
        type: String
    },
    mobile_no: {
        type: String
    },
    merch_semester: {
        type: String
    },
    merch_branch: {
        type: String
    },
    merch_type: {
        type: Array
    }
})




const merchModel = mongoose.model("merch_info", MerchSchema)


module.exports = merchModel;

