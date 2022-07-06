const express = require('express');
const router = express.Router();
const controller = require('../controllers/user/users');
const reg = require('../controllers/user/reg');
const login = require('../controllers/user/login');
const authenticateToken = require('../middlware/auth.js')
const validation = require('../middlware/validation.js');
const multer = require('../middlware/multerUser.js');

router.get('/', controller.getAllUsers);
router.post('/', validation(),  reg.createUser);
router.put('/',  multer.uploadFile,  validation(),  authenticateToken, controller.updateUser);
router.delete('/', authenticateToken,controller.deleteUser);
router.post('/login', login.loginUser);


module.exports = router;
