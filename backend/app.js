const express = require('express');
const cors = require('./middlewares/cors')
const path = require('path');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
require('./db').connect('task1');

process.env.FILESPATH = process.cwd() + '/files';

const app = express();

app.use(express.static(path.join(__dirname, 'files')));
app.use(express.json());
app.use(cors);

app.use('/api/items', itemsRouter)
app.use('/api/users', usersRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("listening to port " + port)
})


