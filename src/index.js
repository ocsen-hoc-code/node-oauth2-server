import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import db from './Database/models';

db.Users.findOne({ where: { Id: '91d322df-8436-4f51-95c5-9d2c9efd656f' }, raw: true }).then(users => {
    console.log(users);
});

const PORT = process.env.PORT || 8888;
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => { res.status(200).json({ msg: 'Welcome to Oauth2 Server' }) });
const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server run on port: http://127.0.0.1:${PORT}`);
})