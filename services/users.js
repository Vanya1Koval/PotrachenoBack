const sequelize = require('../connection');


class UserService {
    
    async getUsersFromStorage() {
        const rawData = await sequelize.query('SELECT * FROM db.users')
        return JSON.parse(rawData);
    }

    async getAll() {
        const rawData = await sequelize.query('SELECT * FROM db.users')
        return JSON.parse(rawData);
    }

    async getOne(id) {
        const rawData = await sequelize.query(`SELECT * FROM db.users WHERE id = '${id}'`)
        return JSON.parse(rawData);
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
