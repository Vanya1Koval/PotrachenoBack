const userServiceClass = require('../services/users')
const bcrypt = require('bcrypt');
const multer = require('../middlware/multer.js');
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

const createUser = async (req, res) => {
    try {
        const { name, login, password } = req.body;
        const userLogin = await userService.getOneByLogin(login);
        console.log(userLogin)
         if (!userLogin) {
            const passwordHash = bcrypt.hashSync(password, salt)
            const user = await userService.create( name, login, passwordHash );
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

const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body;
        const userLogin = await userService.getOneByLogin(login);
        console.log(userLogin.password)
         if (userLogin && bcrypt.compareSync(password, userLogin.password)) {
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

