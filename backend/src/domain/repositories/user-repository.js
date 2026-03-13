export class UserRepository {
    constructor() {
        this.users = [];
    }

    async findByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    async create({ name, email, password }) {
        const user = { id: this.users.length + 1, name, email, password };
        this.users.push(user);
        return user;
    }
}