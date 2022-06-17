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

    async updateUserReq(userId, id) {

        return this.userModel.findOneAndUpdate({_id: `${userId}`}, 
        { $set: {requests: arrayId}},
        {returnOriginal: false}
        )
    }


}

module.exports =  UserService ;