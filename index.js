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

const port = process.env.port || 4000;

//the '0.0.0.0' is because of heroku will asign the port and the domain
server.listen(port, '0.0.0.0', () => {
	console.log(`running on port ${port}`);
});