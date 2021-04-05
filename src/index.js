import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import db from './Database/models';
import OAuth2Server from 'oauth2-server';
import { Oauth2Model } from './Models/Oauth2/Oauth2Model';
import { oauth2Route } from './Routes'
import { UserService } from './Services'

const userService = new UserService(db);
const model = Oauth2Model(userService);
const oauth = new OAuth2Server({ model: model });
const PORT = process.env.PORT || 8888;
const app = express();

app.oauth = oauth;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => { res.status(200).json({ msg: 'Welcome to Oauth2 Server' }) });
oauth2Route(app);

const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server run on port: http://127.0.0.1:${PORT}`);
});
