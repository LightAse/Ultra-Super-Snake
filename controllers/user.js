require('mongoose');
const Usr = require('../models/user');

const addUser = async (name,lastname,email) => {

    
    let existUser = await Usr.findOne({email: email});
    console.log(existUser);
    if(!existUser){
        const usr = new Usr(
            {
                name:name,
                lastname:lastname,
                email:email
            }
        )
    }else{
        return false;
    }


}


const getAllUsers = async (limit,offset) => {

    const users = await Usr.find({}).limit(limit).skip(offset);

    return users;
}

const getUser = async(id) => {

    const user = await Usr.findById(id);

    return user;

}

const editUser = async(user) => {

    const result = await Usr.findByIdAndUpdate(user._id,user,{new:true});
    
    return result;

}



module.exports = {addUser, getAllUsers, getUser, editUser}