require('dotenv').config();

const { MongoClient } = require('mongodb');
const url = require("url");

class UserService {
    constructor() {
        this.uri = `mongodb://${process.env.DB_ADMIN_NAME || 'root'}:${process.env.DB_ADMIN_PASS || 'example'}@mongo:27017`;
        this.client = new MongoClient(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
    }
    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
        this.db = this.client.db('users');
        this.collection = this.db.collection('list');
    }
    async checkUserCredentials(login, password) {
        try {
            await this.connect();
            const user = await this.collection.findOne({ login, password });
            return user !== null;
        } catch (error) {
            console.error('Error checking user credentials:', error);
            throw error;
        }
    }
}

module.exports = UserService;