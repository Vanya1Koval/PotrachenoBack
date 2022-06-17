const dotenv = require('dotenv').config();
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
        const post = new this.postModel({ img: img, text: text, creatorId: creatorId, date: new Date()});
        post.save(function(err){
            if(err) return console.log(err);
        });
        return await { img, text };
    }

    async update(_id, text, img) {
        return this.postModel.findOneAndUpdate({_id: `${_id}`}, 
        { $set: {text: `${text}`, img: `${img}`}},
        {returnOriginal: false}
        )
    }

    async updatePic(_id, img) {
        return this.postModel.findOneAndUpdate({_id: `${_id}`}, 
        { $set: { img: `${img}`}},
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