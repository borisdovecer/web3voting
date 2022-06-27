const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const config = require('./config/config.js');

const app = express();
const port = 8080;
require('dotenv').config();

// Connect to MongoDB
try {
    mongoose
        .connect(
            config.database.url,
            { useNewUrlParser: true ,useUnifiedTopology: true},
            () => {}
        )
    console.log('Database connected');
} catch (e) {
    console.log(e);
}

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();

});
app.use(cors({origin: null}));
app.use(express.json());
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
