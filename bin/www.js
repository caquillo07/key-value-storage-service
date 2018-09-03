import app from '../app';
import http from 'http';
import Debug from 'debug';

const debug = Debug('wiki-task:server');
const port = 3000;
const server = http.createServer(app);

server.listen(process.env.PORT || port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EADDRINUSE':
            console.error(`${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    debug(`Listening on ${port}`);
}
