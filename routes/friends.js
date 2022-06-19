const express = require('express');
const router = express.Router();
const friends = require('../controllers/user/friends')

router.post('/', friends.addRequest);

module.exports = router;
