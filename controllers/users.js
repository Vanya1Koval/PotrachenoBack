const userServiceClass = require('../services/users')
const bcrypt = require('bcrypt');
const multer = require('../middlware/multer.js');
const userService = new userServiceClass()

const salt = bcrypt.genSaltSync(10);


const getAllUsers = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            const users = await userService.getAll();
            return res.json(users);
        }
        else {
            const user = await userService.getOne(id);
            if (user[0]) {
                return res.json(user);
            } else {
                return res.status(404).send(`User with id ${id} doesn't exist`)
            }
        }
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, login, password } = req.body;
        const userLogin = await userService.getOneByLogin(login);
        if (!userLogin[0]) {
            const passwordHash = bcrypt.hashSync(password, salt)
            const user = await userService.create(name, login, passwordHash);
            return res.json(user);
        } else {
            res.status(404).send(`Login ${login} already taken or you entered empty login/password`)
        }
    } catch(e) {
            console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }  
};

const updateUser = async (req, res) => {
    try {
        const { id, name, login, password  } = req.body;
        const user = await userService.getOne(id);
        if (user[0] && login && password) {
            const passwordHash = bcrypt.hashSync(password, salt)
            const updatedUser = await userService.update(id, name, login, passwordHash);
            return res.json(updatedUser);
        }
        else {
            return res.status(404).send(`User with id ${id} doesn't exist or you entered empty login/password`)
        }
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }
};

const deleteUser = async (req, res) => {
    try{
        const { id } = req.body;
        const user = await userService.getOne(id);
        if (user[0]) {
            await userService.delete(id);
            return res.send(`user with id ${id} was deleted`);
        }
        else {
            return res.status(404).send(`User with id ${id} doesn't exist`)
        }
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }  
};

const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body;
        const userLogin = await userService.getOneByLogin(login);
        const passwordHash = bcrypt.hashSync(password, salt);
         if (userLogin[0] && bcrypt.compareSync(password, userLogin[0].password)) {
            const token = userService.genToken(login);
            return res.json(token);
        } else {
            res.send('Wrong login/password');
        } 
    } catch(e) {
            console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }  
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, loginUser };

