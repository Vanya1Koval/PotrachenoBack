const userServiceClass = require('../services/users')
const userService = new userServiceClass()


const getAllUsers = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        const users = await userService.getAll();
        res.json(users);
    }
    else {
        const user = await userService.getOne(id);
        if (user[0]) {
            res.json(user);
        } else {
            res.status(404).send(`User with id ${id} doesn't exist`)
        }
    }
};

const createUser = async (req, res) => {
    const { id, name } = req.body;
    const oneUser = await userService.getOne(id);
    if (oneUser[0]) {
        res.status(404).send(`User with id ${id} already exist`);
    }
    else {
        const user = await userService.create(id, name);
        res.json(user);
    }
};

const updateUser = async (req, res) => {
    const { id, name } = req.body;
    const user = await userService.getOne(id);
    if (user[0]) {
        const updatedUser = await userService.update(id, name);
        res.json(updatedUser);
    }
    else {
        res.status(404).send(`User with id ${id} doesn't exist`)
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.body;
    const user = await userService.getOne(id);
    if (user[0]) {
        await userService.delete(id);
        res.send(`user with id ${id} was deleted`);
    }
    else {
        res.status(404).send(`User with id ${id} doesn't exist`)
    }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };

