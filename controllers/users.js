const userServiceClass = require('../services/users')
const userService = new userServiceClass()

const getAllUsers = (req, res) =>  {
    const users = userService.getAll();
    res.json(users);
};

const getUser = (req, res) =>  {
    const { id } = req.params;
    const user = userService.getOne(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send(`User with id ${id} doesn't exist`)
    }
};

const createUser = (req, res) =>  {
    const { id, name } = req.body;
    
    const user = userService.create(id, name);
    if (user) {
        res.json(user);
    } else {
        res.status(500).send(`Something went wrong`)
    }
};

const updateUser = (req, res) =>  {
    const { id, name } = req.body;
    const user = userService.getOne(id);

    if (!user) {
        res.status(404).send(`User with id ${id} doesn't exist`)
    }

    const updatedUser = userService.update(id, name);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(500).send(`Something went wrong`)
    }
};

const deleteUser = (req, res) =>  {
    const { id } = req.body;
    const user = userService.getOne(id);

    if (!user) {
        res.status(404).send(`User with id ${id} doesn't exist`)
    }

    const deleted = userService.delete(id);
    if (deleted) {
        res.json(`User with id ${id} succesfully deleted`);
    } else {
        res.status(500).send(`Something went wrong`)
    }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
