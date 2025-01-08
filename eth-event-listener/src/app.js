const express = require('express');
const listener = require('./listener');
const { port } = require('../config/config');
const logger = require('./utils').logger;

const app = express();

// 启动事件监听服务
listener.start();

app.get('/', (req, res) => {
    res.send('ETH Event Listener Service is running!');
});

app.listen(port, () => {
    logger.info(`Service running on port ${port}`);
});
