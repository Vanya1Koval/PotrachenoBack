const userServiceClass = require('../../services/friends')
const userService = new userServiceClass()

const addRequest = async (req, res) => {
    try {
        const { userId, id, img, name  } = req.body;
        const obj = {id: id,
                    img: img,
                    name: name,
                    status: 'pending'}
        const updatedUser = await userService.addRequest(userId, obj);
        return res.json(updatedUser);
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }
};

const addFriend = async (req, res) => {
    try {
        const { userId, id, img, name  } = req.body;
        const obj = {id: id,
                    img: img,
                    name: name,
                    status: 'confirmed'}
        const updatedUser = await userService.addFriend(userId, id, obj);
        return res.json(updatedUser);
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }
};

const deleteRequest = async (req, res) => {
    try {
        const { userId, id  } = req.body;
        const updatedUser = await userService.deleteRequest(userId, id);
        return res.json(updatedUser);
    } catch(e) {
        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
    }
};




module.exports = { addRequest, deleteRequest, addFriend };
