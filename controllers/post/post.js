const postServiceClass = require('../../services/posts')
const bcrypt = require('bcrypt');
const multer = require('../../middlware/multer.js');
const postService = new postServiceClass()

const salt = bcrypt.genSaltSync(10);

const getAllPosts = async (req, res) => {
    try {
    
            const posts = await postService.getAll();
            return res.json(posts);
    
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
        return res.status(404).send(`User with id ${_id} doesn't exist`);
    }
};

const getPostsByUserId = async (req, res) => {
    try {
            const { id } = req.body;
            const posts = await postService.getAllByUserId(id);
            return res.json(posts);
    
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
        return res.status(404).send(`User with id ${_id} doesn't exist`);
    }
};

const createPost = async (req, res) => {
    try {
        const { img, text, creatorId } = req.body;
            console.log(creatorId)
            const post = await postService.create( img, text, creatorId );
            console.log(post);
            return res.json(post);
        }
     catch(e) {
            console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }  
};

const updateUser = async (req, res) => {
    try {
        const { _id, name, login, password  } = req.body;
        const passwordHash = bcrypt.hashSync(password, salt)
        const updatedUser = await userService.update(_id, name, login, passwordHash);
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

module.exports = { getAllPosts, updateUser, createPost, deleteUser, getPostsByUserId };
