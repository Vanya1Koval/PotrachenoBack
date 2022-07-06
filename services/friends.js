const dotenv = require('dotenv').config();
const User = require('../models/user.js');
const { default: mongoose } = require('mongoose');


class UserService {

    userModel = mongoose.model('User');

    async addRequest(userId, obj) {
        const user = await this.userModel.findById(userId);
        user.friends.push(obj)
         return this.userModel.findOneAndUpdate({_id: `${userId}`}, 
        { $set: {friends: user.friends}},
        {returnOriginal: false}
        ) 
    }

    async deleteRequest(userId, id) {
        const user = await this.userModel.findById(userId);
        const newArray = user.friends.filter((item) => item.id !== id);
        return this.userModel.findOneAndUpdate({_id: `${userId}`}, 
        { $set: {friends: newArray}},
        {returnOriginal: false}
        ) 
    }

    async addFriend(userId, id, obj) {
        const user = await this.userModel.findById(userId);
        const newArray = user.friends.filter((item) => item.id !== id);
        newArray.push(obj)
        return this.userModel.findOneAndUpdate({_id: `${userId}`}, 
        { $set: {friends: newArray}},
        {returnOriginal: false}
        ) 
    }


}

module.exports =  UserService ;