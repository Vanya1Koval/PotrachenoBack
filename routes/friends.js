const express = require('express');
const router = express.Router();
const friends = require('../controllers/user/friends')

router.post('/', friends.addRequest);
//router.put('/', friends.updateRequests);
//router.delete('/', friends.updateRequests);


module.exports = router;