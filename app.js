const mongoose = require("mongoose")
const express = require('express');
const { connect } = require('./connection.js');

const app = express();
const userRouter = require('./routes/users');

app.use(express.json());

app.use('/users', userRouter);

connect.then(()=> {
    app.listen(3000, function() {
        console.log('server running at port 3000');
    });
});

