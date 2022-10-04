const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usrSchema = new Schema({

    email:{
        type: String,
        required:true,
        index: {unique: true, dropDups: true}
    },
    name:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:true
    }
})

const Usr = mongoose.model('usr',usrSchema);
module.exports = Usr;