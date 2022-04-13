const sequelize = require('../connection');
const { QueryTypes } = require('sequelize');



class UserService {
    
     async getUsersFromStorage() {
        const rawData = await sequelize.query('SELECT * FROM `users`', { type: QueryTypes.SELECT });
        //console.log(rawData)
        return rawData;
    } 

    async getAll() {
        const rawData = await sequelize.query('SELECT * FROM users', { type: QueryTypes.SELECT })
        console.log(rawData)
        return rawData;
    } 

    async getOne(id) {
        console.log(id);
        const rawData = await sequelize.query(`SELECT * FROM users WHERE id = "${id}"`, { type: QueryTypes.SELECT })
        console.log(rawData);
        return rawData;
    }

    async create(id, name) {
        const users = await this.getUsersFromStorage();
        if (users.find(user => user.id === id)) {return 'id already exist'}
        else{
            sequelize.query(`INSERT INTO users (id, name) VALUES (${id}, '${name}')`)
        return { id, name };
        }
    }

    async update(id, name) {
        
        sequelize.query(`UPDATE users SET name = '${name}' WHERE id = ${id}`)

        return { id, name };
    }

    async delete(id) {
        sequelize.query(`DELETE FROM users WHERE id = ${id}`)
    }
}
    
module.exports = UserService;
