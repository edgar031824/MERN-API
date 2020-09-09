const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');

const server = express();
//connect to DB
connectDb();

//enable express.json to receive information through post request(do the same that bodyparse module)
server.use(express.json({ extended: true }));

//allow cors
server.use(cors());
//import routes
server.use('/', express.static('./public/'));
server.use('/api/user', require('./routes/users'));
server.use('/api/auth', require('./routes/auth'));
server.use('/api/project', require('./routes/project'));
server.use('/api/task', require('./routes/task'));

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`running on port ${PORT}`);
});