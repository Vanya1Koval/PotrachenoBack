const Admin = require('../models/admin.js');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

function generateAccessToken(login) {
    return jwt.sign(login, process.env.TOKEN_SECRET);
  }

class AdminService {

    adminModel = mongoose.model('Admin');

    async getAll() {
        return this.userModel.find();
    }

    async getOne(id) {
        return this.userModel.findById(id);
    }

    async getOneByLogin(login) {
        return this.userModel.findOne({login: `${login}`});
    }

    async create( userLogin ) {
        const isAdmin = false
        const admin = new this.adminModel({  userLogin: userLogin, isAdmin: isAdmin });
        admin.save(function(err){
            if(err) return console.log(err);
        });
        return await { userLogin, isAdmin };
    }

    async update(id, name, login, passwordHash) {
        return this.userModel.findOneAndUpdate({_id: `${id}`}, 
        { $set: {name: `${name}`, login: `${login}`, password: `${passwordHash}`}},
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

module.exports =  AdminService ;