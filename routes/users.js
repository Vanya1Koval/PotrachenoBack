const express = require('express');
const router = express.Router();
const controller = require('../controllers/user/users');
const reg = require('../controllers/user/reg');
const login = require('../controllers/user/login');
const friends = require('../controllers/user/friends')
const authenticateToken = require('../middlware/auth.js')
const validation = require('../middlware/validation.js');
const multer = require('../middlware/multerUser.js');

router.get('/', controller.getAllUsers);
router.post('/', validation(),  reg.createUser);
router.put('/', validation(), authenticateToken,controller.updateUser);
router.delete('/', authenticateToken,controller.deleteUser);
router.post('/login', login.loginUser);
router.post('/pic', multer.uploadFile, controller.updatePic);

module.exports = router;
