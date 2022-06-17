const dotenv = require('dotenv').config();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

function generateAccessToken(login) {
    return jwt.sign(login, process.env.TOKEN_SECRET);
  }

class UserService {

    userModel = mongoose.model('User');

    async getAll() {
        return this.userModel.find();
    }

    async getOne(id) {
        return this.userModel.findById(id);
    }

    async getOneByLogin(login) {
        return this.userModel.findOne({login: `${login}`});
    }

    async create(  name, login, passwordHash ) {
        const user = new this.userModel({  name: name, login: login, password: passwordHash, friends: [], requests: [] });
        user.save(function(err){
            if(err) return console.log(err);
        });
        return await {  name, login, passwordHash };
    }

    async update(id, name, login, passwordHash) {
        return this.userModel.findOneAndUpdate({_id: `${id}`}, 
        { $set: {name: `${name}`, login: `${login}`, password: `${passwordHash}`}},
        {returnOriginal: false}
        )
    }

    async updatePic(img, _id) {
        return this.userModel.findOneAndUpdate({_id: `${_id}`}, 
        { $set: {img: `${img}`}},
        {returnOriginal: false}
        )
    }

    async updateFriends(userId, arrayId) {
        return this.userModel.findOneAndUpdate({_id: `${userId}`}, 
        { $set: {friends: arrayId}},
        {returnOriginal: false}
        )
    }

    async updateUserReq(userId, arrayId) {
        return this.userModel.findOneAndUpdate({_id: `${userId}`}, 
        { $set: {requests: arrayId}},
        {returnOriginal: false}
        )
    }


    async delete(id) {
        return this.userModel.findOneAndDelete({_id: `${id}`});
    }

    genToken(login) {
        const token = generateAccessToken(login);
        return { token };
    }

}

module.exports =  UserService ;
