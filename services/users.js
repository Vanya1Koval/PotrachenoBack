const sequelize = require('../connection');
const { QueryTypes } = require('sequelize');



class UserService {
    
    async getUsersFromStorage() {
        const rawData = await sequelize.query('SELECT * FROM `users`', { type: QueryTypes.SELECT });
        console.log(rawData)
        return rawData;
    }

    async getAll() {
        const rawData = await sequelize.query('SELECT * FROM users', { type: QueryTypes.SELECT })
        console.log(rawData)
        return rawData;
    }

    async getOne(id) {
        const rawData = await sequelize.query(`SELECT * FROM users WHERE id = '${id}'`, { type: QueryTypes.SELECT })
        return rawData;
    }

    async create(id, name) {
        const users = await this.getUsersFromStorage();
        if (users.find(user => user.id === id)) {return 'id already exist'}
        else{
        sequelize.create({ id, name });
        return { id, name };
        }
    }

    async update(id, name) {
        const users = await this.getUsersFromStorage();

        const userIndex = users.findIndex(user => user.id === id);

        if (!userIndex && userIndex !== 0) {
            return null;
        }

        sequelize.update({ name }, {
            where: {
              id: `${id}`
            }
          })
        return { id, name };
    }

    async delete(id) {
        const users = await this.getUsersFromStorage();
        const userIndex = users.findIndex(user => user.id === id);
        if (!userIndex && userIndex !== 0) {
            return null;
        }
        sequelize.destroy({
            where: {
                id: `${id}`
            }
          });
        return true;
    }
}
    
module.exports = UserService;
