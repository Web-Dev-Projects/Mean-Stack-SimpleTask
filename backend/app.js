const express = require('express');
const cors = require('./middlewares/cors')
const path = require('path');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
require('./db').connect('schneider');

process.env.FILESPATH = process.cwd() + '/tmp';

const app = express();

app.use(express.static(path.join(__dirname, 'tmp')));
app.use(express.json());
app.use(cors);

app.use('/api/items', itemsRouter)
app.use('/api/users', usersRouter)

app.listen(5000, () => {
    console.log("listening to port " + 5000)
})


