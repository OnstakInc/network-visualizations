#!/usr/bin/env node

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const os = require('os');

const { Logger, HttpMessage } = require('../src/core');
const { HOST, PORT } = require('../src/config/environment');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', (req, res, next) => {
    return res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        uptime: os.uptime(),
        network: os.networkInterfaces()
    });
});

app.get('/health', (req, res, next) => {
    return res.json(HttpMessage.ok('Node is healthy.'));
});


app.use((req, res, next) => {
    return res.status(404).json(HttpMessage.notFound());
});

/**
 * Create server module
 */
const server = http.createServer(app);

server.listen(PORT, HOST);
server.on('error', onError);
server.on('listening', onListening);

function onListening() {
    Logger.log(`Server is listening on http://${server.address().address}:${server.address().port}`);
}

function onError(err) {
    Logger.error(err.message);
    process.exit(1);
}
