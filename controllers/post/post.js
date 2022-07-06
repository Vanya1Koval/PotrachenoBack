const postServiceClass = require('../../services/posts')
const bcrypt = require('bcrypt');
const postService = new postServiceClass()

const salt = bcrypt.genSaltSync(10);

const getAllPosts = async (req, res) => {
    try {
    
            const posts = await postService.getAll();
            return res.json(posts);
    
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
        return res.status(404).send(`Something went wrong`);
    }
};

const getPostsByUserId = async (req, res) => {
    try {
            const { id } = req.body;
            const posts = await postService.getAllByUserId(id);
            return res.json(posts);
    
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
        return res.status(404).send(`Something went wrong`);
    }
};

const createPost = async (req, res) => {
    try {
        const { text, creatorId } = req.body;
        console.log(req.body)
        const img = req.file.filename
        console.log(img)
        console.log(req.body)
        const post = await postService.create( img, text, creatorId );
        return res.json(post);
        }
     catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }  
};

const updatePost = async (req, res) => {
    try {
        const { _id, text  } = req.body;
        
        const updatedPost = await postService.update(_id, text, img );
        return res.json(updatedPost);
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }
};

const deletePost = async (req, res) => {
    const { _id } = req.body;
    try{
        if(_id){
            await postService.delete(_id);      
            res.send(`Post was deleted`);
        }
        else{
            return res.status(404).send(`Something went wrong`);
        }
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack); 
        return res.status(404).send(`Something went wrong`);
    }  
};

module.exports = { getAllPosts, updatePost, createPost, deletePost, getPostsByUserId };
