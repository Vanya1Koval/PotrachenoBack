const dotenv = require('dotenv').config();
const sequelize = require('../connection.js');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

function generateAccessToken(login) {
    return jwt.sign(login, process.env.TOKEN_SECRET);
  }

class UserService {

    async getAll() {
        const rawData = await sequelize.query('SELECT * FROM users', { type: QueryTypes.SELECT })
        return rawData;
    }

    async getOne(id) {
        const rawData = await sequelize.query(`SELECT * FROM users WHERE id = "${id}"`, { type: QueryTypes.SELECT })
        return rawData;
    }

    async getOneByLogin(login) {
        const rawData = await sequelize.query(`SELECT * FROM users WHERE login = "${login}"`, { type: QueryTypes.SELECT })
        return rawData;
    }

    async create(name, login, passwordHash) {
        const token = generateAccessToken(login);
        sequelize.query(`INSERT INTO users ( name, login, password) VALUES ('${name}','${login}', '${passwordHash}')`);
        return await { name, login, passwordHash, token };
    }

    async update(id, name, login, passwordHash) {
        const token = generateAccessToken(login);
        sequelize.query(`UPDATE users SET name = '${name}', login = '${login}', password = '${passwordHash}' WHERE id = '${id}'`)
        return await { id, name, login, passwordHash, token };
    }

    async delete(id) {
       return sequelize.query(`DELETE FROM users WHERE id = '${id}'`)
    }

    genToken(login) {
        const token = generateAccessToken(login);
        return { token };
    }

}

module.exports =  UserService ;
