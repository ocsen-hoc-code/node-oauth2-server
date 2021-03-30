import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';


const PORT = process.env.PORT || 8888;
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => { res.status(200).json({ msg: 'Welcome to Oauth2 Server' }) });
const server = http.createServer(app);
server.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server run on port: http://127.0.0.1:${PORT}`);
})