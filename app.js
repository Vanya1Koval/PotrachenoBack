const mongoose = require("mongoose")
const express = require('express');
const { connect } = require('./connection.js');

const app = express();
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const friendsRouter = require('./routes/friends');

app.use(express.json());

app.use('/static', express.static(__dirname + '/public'));
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/friends', friendsRouter);


connect.then(()=> {
    app.listen(3000, function() {
        console.log('server running at port 3000');
    });
});

