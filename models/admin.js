const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
	id: String,
    userLogin: String,
    isAdmin: Boolean
}, {versionKey: false});


	
mongoose.model("Admin", adminSchema);