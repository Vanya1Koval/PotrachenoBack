const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const authenticateToken = require('../middlware/auth.js')
const validation = require('../middlware/validation.js');
const multer = require('../middlware/multer.js');

router.get('/', controller.getAllUsers);
router.post('/', validation(),  controller.createUser);
router.put('/', validation(), authenticateToken,controller.updateUser);
router.delete('/', authenticateToken,controller.deleteUser);
router.post('/login', controller.loginUser);
router.post('/pic', multer.uploadFile);

module.exports = router;
