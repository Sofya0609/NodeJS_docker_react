require('dotenv').config();

const { MongoClient } = require('mongodb');
const url = require("url");

class KeyRatesService {
    constructor() {
        this.uri = `mongodb://${process.env.DB_ADMIN_NAME || 'root'}:${process.env.DB_ADMIN_PASS || 'example'}@mongo:27017`;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.typeMapping = {
            'auto': 'Автокредит',
            'consumer': 'Потребительский',
            'mortgage': 'Ипотека'
        };
    }

    async fetchKeyRates() {
        try {
            await this.client.connect();
            const database = this.client.db('Key_bids');
            const collection = database.collection('Ключевые ставки');
            const query = {};
            const projection = { type: 1, rate: 1, _id: 0 };
            const cursor = collection.find(query).project(projection);
            return await cursor.toArray();
        } catch (error) {
            console.error('Error fetching key rates:', error);
            throw error;
        } finally {
            await this.client.close();
        }
    }

    async updateKeyRate(type, newRate) {
        const dbType = this.typeMapping[type];
        if (!dbType) {
            throw new Error(`Unknown type: ${type}`);
        }
        try {
            await this.client.connect();
            const database = this.client.db('Key_bids');
            const collection = database.collection('Ключевые ставки');
            const filter = { type: type };
            const updateDoc = {
                $set: { rate: newRate }
            };
            const result = await collection.updateOne(filter, updateDoc);
            if (result.modifiedCount === 1) {
                console.log(`Successfully updated the rate for type: ${type}`);
            } else {
                console.log(`No document found with type: ${type}`);
            }
            return result;
        } catch (error) {
            console.error('Error updating key rate:', error);
            throw error;
        } finally {
            await this.client.close();
        }
    }
}

module.exports = KeyRatesService;