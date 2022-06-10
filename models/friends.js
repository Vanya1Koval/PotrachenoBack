const mongoose = require('mongoose');


const friendsSchema = new mongoose.Schema({
	id: String,
    idUser: String,
    pending: Array,
    current: Array,
    userReq: Array
}, {versionKey: false});


	
mongoose.model("Friends", friendsSchema);