const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
	id: String,
    text: String,
    img: String,
    creatorId: String,
    likes: Array,
    comments: Array,
    date: String
}, {versionKey: false});


	
mongoose.model("Posts", postsSchema);