const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    req_number:{
        type:String
    }, req_blood_group:{
        type:String
    }, req_city:{
        type:String
    }, req_state:{
        type:String
    }, patient_desc:{
        type:String
    }, patient_name:{
        type:String
    }
})

const reqModel = mongoose.model("requests" , UserSchema)


module.exports = reqModel;


