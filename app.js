const express = require('express');
const app = express();
const userRouter = require('./routes/users');

app.use(express.json());

app.use('/users', userRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(3000);

console.log('Server started on port 3000');