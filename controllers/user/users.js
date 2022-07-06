const userServiceClass = require('../../services/users')
const bcrypt = require('bcrypt');
const multer = require('../../middlware/multerUser.js');
const userService = new userServiceClass()

const salt = bcrypt.genSaltSync(10);

const getAllUsers = async (req, res) => {
    const { _id } = req.body;
    try {
        if (!_id) {
            const users = await userService.getAll();
            return res.json(users);
        }
        else {
            const user = await userService.getOne(_id);
            return res.json(user); 
        }
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
        return res.status(404).send(`User with id ${_id} doesn't exist`);
    }
};

const updateUser = async (req, res) => {
    try {
        const { _id, name } = req.body;
        const img = req.file.filename
        console.log(img)
        console.log(req.body)
        const updatedUser = await userService.update(_id, name, img );
        return res.json(updatedUser);
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }
};

 const updatePic = async ( req, res) => {
    try {
        const { _id } = req.body;
        console.log(req.file)
        const img = req.file.filename
        console.log(img)
         const updatedUser = await userService.updatePic(img, _id);
        return res.json(updatedUser);
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }
}; 

const deleteUser = async (req, res) => {
    const { _id } = req.body;
    try{
        if(_id){
            await userService.delete(_id);      
            res.send(`User with id ${_id} was deleted`);
        }
        else{
            return res.status(404).send(`User with id ${_id} doesn't exist`);
        }
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack); 
        return res.status(404).send(`User with id ${_id} doesn't exist`);
    }  
};

module.exports = { getAllUsers, updateUser, updatePic,  deleteUser };
