const userServiceClass = require('../../services/users')
const bcrypt = require('bcrypt');
const userService = new userServiceClass()

const salt = bcrypt.genSaltSync(10);

const loginUser = async (req, res) => {
    try {
        const { login, password } = req.body;
        const userLogin = await userService.getOneByLogin(login);
         if (userLogin && bcrypt.compareSync(password, userLogin.password)) {
            const token = userService.genToken(login);
            return res.send({
                userLogin,
                token
            });
        } else {
            res.send('Wrong login/password');
        } 
    } catch(e) {
            console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }  
};

module.exports = { loginUser };
