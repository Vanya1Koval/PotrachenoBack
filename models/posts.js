const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const postsSchema = new mongoose.Schema({
	id: String,
    text: String,
    img: String,
    creatorId: String,
}, {versionKey: false});


	
mongoose.model("Posts", postsSchema);