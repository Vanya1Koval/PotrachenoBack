const fs = require('fs')
const pathToStorage = require('path').resolve(__dirname, '../storage.json');

class UserService {
    getUsersFromStorage() {
        const rawData = fs.readFileSync(pathToStorage);
        return JSON.parse(rawData);
    }

    writeUsersToStorage(users) {
        fs.writeFileSync(pathToStorage, JSON.stringify(users));
    }

    getAll() {
        const users = this.getUsersFromStorage();
        console.log(users)
        return users;
    }

    getOne(id) {
        const users = this.getUsersFromStorage();
        return users.find(user => user.id === id)
    }

    create(id, name) {
        const users = this.getUsersFromStorage();
        if (users.findIndex(user => user.id === id)) {
            return 'id alredy exist';
        } else {
        users.push({ id, name });
        this.writeUsersToStorage(users)
        return { id, name };
        }
    }

    update(id, name) {
        const users = this.getUsersFromStorage();

        const userIndex = users.findIndex(user => user.id === id);

        if (!userIndex && userIndex !== 0) {
            return null;
        }

        users[userIndex].name = name;
        this.writeUsersToStorage(users)
        return { id, name };
    }

    delete(id) {
        const users = this.getUsersFromStorage();
        const userIndex = users.findIndex(user => user.id === id);
        if (!userIndex && userIndex !== 0) {
            return null;
        }
        users.splice(userIndex, 1)
        this.writeUsersToStorage(users)
        return true;
    }
}
    
module.exports = UserService;
