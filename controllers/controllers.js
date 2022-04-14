const userServiceClass = require('../services/users')
const userService = new userServiceClass() 


const  getAllUsers = async (req, res) =>  {
    const { id } = req.body;
    if (id == undefined) {
        const users = await userService.getAll();
        res.json(users);
    }
    else {
        const user =  await userService.getOne(id);
        if (user[0] == undefined) {
            res.status(404).send(`User with id ${id} doesn't exist`)
        } else {
            res.json(user);
        } 
    }
};  

const createUser = async (req, res) =>  {
    const { id, name } = req.body;
    const oneUser = await userService.getOne(id);
    if (oneUser[0] == undefined) { 
        const user = await userService.create(id, name);
        res.json(user);
    }
    else {
        res.status(404).send(`User with id ${id} already exist`);
    }
};

const updateUser = async (req, res) =>  {
    const { id, name } = req.body;
    const user = await userService.getOne(id);
    if (user[0] == undefined) {
        res.status(404).send(`User with id ${id} doesn't exist`)
    }
    else {
        const updatedUser = await userService.update(id, name);
        res.json(updatedUser);
    }
};

const deleteUser = async (req, res) =>  {
    const { id } = req.body;
    const user = await userService.getOne(id);
    if (user[0] == undefined) {
        res.status(404).send(`User with id ${id} doesn't exist`)
    }
    else {
        const deleted = await userService.delete(id);
        res.send(`user with id ${id} was deleted`);
    }
};

module.exports = {  getAllUsers, createUser, updateUser, deleteUser };
