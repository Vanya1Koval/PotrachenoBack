const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { boolean } = require('joi');

const userSchema = new mongoose.Schema({
	id: String,
    name: String,
    login: String,
    password: String,
    img: String,
    friends: Array
}, {versionKey: false});


	
mongoose.model("User", userSchema);