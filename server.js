const express = require('express');
const connecttoDB = require('./db')
const auth = require('./routes/auth');
const camp = require('./routes/Camp');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
connecttoDB();

app.use('/api/auth',auth);
app.use('/api/camp',camp);

const port = 5000;

app.listen(port,() => {
    console.log(`server listening on port ${port}`);
})