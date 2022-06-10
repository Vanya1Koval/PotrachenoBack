const dotenv = require('dotenv').config();
const sequelize = require('../connection.js');
const Post = require('../models/posts.js');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

function generateAccessToken(login) {
    return jwt.sign(login, process.env.TOKEN_SECRET);
  }

class PostService {

    postModel = mongoose.model('Posts');

    async getAll() {
        return this.postModel.find();
    }

    async getAllByUserId (id) {
        return this.postModel.find({creatorId: `${id}`});
    }

    async getOneByLogin(login) {
        return this.postModel.findOne({login: `${login}`});
    }

    async create( img, text, creatorId ) {
        console.log(`!!!! ${creatorId}`)
        const post = new this.postModel({ img: img, text: text, creatorId: creatorId});
        post.save(function(err){
            if(err) return console.log(err);
        });
        return await { img, text };
    }

    async update(id, name, login, passwordHash) {
        return this.postModel.findOneAndUpdate({_id: `${id}`}, 
        { $set: {name: `${name}`, login: `${login}`, password: `${passwordHash}`}},
        {returnOriginal: false}
        )
    }

    async delete(id) {
        return this.postModel.findOneAndDelete({_id: `${id}`});
    }

    genToken(login) {
        const token = generateAccessToken(login);
        return { token };
    }

}

module.exports =  PostService ;