import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

const app: express.Application = express();
const port = 3000;

const server = http.createServer(app);

app.get('/', (req, res): void => {
    res.send('Hello World')
});

const io = socketIo(server);

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
