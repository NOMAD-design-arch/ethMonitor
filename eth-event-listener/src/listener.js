const { contract,web3 } = require('./blockchain');
const { eventName, startBlock, emailTitle, emailContent,maxRetries,eventInterval} = require('../config/config');
const { sendEmail,sendAlertEmail } = require('./mailer');
const logger = require('./utils').logger;


let currentBlock = startBlock;
let reTry = 0;

async function start() {
    try {
        const latestBlock = await web3.eth.getBlockNumber();
        console.log(`currentBlock: ${currentBlock}, latestBlock: ${latestBlock}`);
        //logger.info(`currentBlock: ${currentBlock}, latestBlock: ${latestBlock}`);
        const events = await contract.getPastEvents(eventName, {
                fromBlock: currentBlock,
                toBlock: latestBlock, 
        });
        //console.log("emailContent: "+emailContent);
        events.forEach(event => {
            const { transactionHash, returnValues } = event;
            const { from, to, value } = returnValues || {};
            const emailText = `检测到事件:
            交易哈希: ${transactionHash}
            事件名称: ${eventName}
            交易金额: ${value}
            From: ${from}
            To: ${to}
            操作说明：${emailContent}
            操作时间: ${getChinaTime()}`; 
            logger.info(`Event detected: ${JSON.stringify(event)}`);
            sendEmail(emailTitle, emailText);
        });
        currentBlock = latestBlock + 1;
        reTry = 0;
    } catch (err) {
        logger.error(`Error in listener: ${err.message}`);
        if (reTry++ > maxRetries) sendAlertEmail(err.message);
    }
    setTimeout(start, eventInterval); // 设置轮询时间
}

// 获取中国时区的时间戳
function getChinaTime() {
    const date = new Date();
    const utcOffset = date.getTimezoneOffset() * 60000;
    const chinaTimeOffset = 8 * 60 * 60000;
    return new Date(date.getTime() + utcOffset + chinaTimeOffset).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  }

module.exports = { start };