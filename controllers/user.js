require('mongoose');
const Usr = require('../models/user');


const addUser = async (name,lastname,email,password) => {

    let existUser = await Usr.findOne({ email: email });
    console.log(existUser);
    if(!existUser) {

        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
        
        const usr = new Usr(
            {              
                name: name,
                lastname:lastname,
                email: email,
                isActive: true,
                password:cryptoPass,
                bestOverallScore: 0,
                bestTimeScore: "00:00",
                bestLvlScore: 1,
                actLvl: 1
            }
        );

        let user = await usr.save(); 
        console.log("usuario nuevo");
        console.log(user);
        return { user }; 

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

    // await Usr.findOne({ _id: req.params.id })

    return user;
}

const findEmail = async(email) =>{

    const user = await Usr.findOne({ email: email});

    return user;

}

const editUser = async(user) => {

    const result = await Usr.findByIdAndUpdate(user._id,user,{new:true});

    return result;
}

const editRoles = async(roles,id) => {

    const result = await Usr.findByIdAndUpdate(id,{$set:{roles:roles}},{new:true});

    return result;
}

const deleteUser = async(id) => {

    const result = await Usr.findByIdAndDelete(id);

    return result;
}

const updateScore = async(score,id) => {

    const result = await Usr.findByIdAndUpdate(id,{bestOverallScore:score},{new:true});

    return result;

}

module.exports = { addUser, getAllUsers, getUser, editUser, editRoles, deleteUser, findEmail, updateScore }