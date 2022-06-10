const userServiceClass = require('../../services/users')
const adminServiceClass = require('../../services/admin')
const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');
const userService = new userServiceClass()
const adminService = new adminServiceClass()

const salt = bcrypt.genSaltSync(10);

const createUser = async (req, res) => {
    try {
        const {  name, login, password } = req.body;
        const userLogin = await userService.getOneByLogin(login);
         if (!userLogin) {
            const passwordHash = bcrypt.hashSync(password, salt)
            const user = await userService.create( name, login, passwordHash );
            const admin = await adminService.create( login );
            return res.json(user);
         } else {
            res.status(404).send(`Login ${login} already taken or you entered empty login/password`)
        }
    } catch(e) {
            console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }  
};

module.exports = { createUser };