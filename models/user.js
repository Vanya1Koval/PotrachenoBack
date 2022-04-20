const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	id: String,
    name: String,
    login: String,
    password: String
}, {versionKey: false});


	
mongoose.model("User", userSchema);