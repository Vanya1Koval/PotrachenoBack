const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlware/auth.js')

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);
router.put('/', authenticateToken,controller.updateUser);
router.delete('/', authenticateToken,controller.deleteUser);

module.exports = router;
