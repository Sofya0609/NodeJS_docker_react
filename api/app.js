const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
const KeyRatesService = require('./KeyRatesService');
const UserService = require('./UserService');
const {MongoClient} = require("mongodb");
const userService = new UserService();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('hi');
});

app.get('/key-rates', async (req, res) => {
    try {
        const keyRatesService = new KeyRatesService();
        const results = await keyRatesService.fetchKeyRates();
        res.send(results);
    } catch (error) {
        console.error('Error fetching key rates:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/admin', async (req, res) => {
    const {username, password} = req.body;
    try {
        const userExists = await userService.checkUserCredentials(username, password);
        if (userExists) {
            res.json({message: 'Authentication successful'});
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({message: 'Internal server', error});
    }
});

app.post('/update-rates', async (req, res) => {
    try {
        const keyRatesService = new KeyRatesService();
        const {type, rate} = req.body;
        await keyRatesService.updateKeyRate(type, rate);
        res.send('Rate updated successfully');
    } catch (error) {
        console.error('Error updating rates:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, () =>
    console.log(`Server running on port ${port}, http://localhost:${port}`)
);