const express = require('express');

const app = express();
const userRouter = require('./routes/users');
const sequelize = require('./connection');




/* app.get("/user", async function(req, res){
    const users = await sequelize.query('SELECT * FROM db.users')
    res.json(users)
});

app.get("/:id", async function(req, res, next){
    const { id } = req.params;
    const users = await sequelize.query(`SELECT * FROM db.users WHERE idUsers = ${id}`);
    res.json(users);
}); */

app.use(express.json());

app.use('/users', userRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(3000);

console.log('Server started on port 3000');