require('dotenv').config();

module.exports = {
    rpcUrl: process.env.RPC_URL,
    contractAddress: process.env.CONTRACT_ADDRESS,
    eventName: process.env.EVENT_NAME,
    startBlock: process.env.START_BLOCK || 'latest',
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        emails: process.env.NOTIFY_EMAILS.split(','),
        adminEmail: process.env.ADMIN_EMAIL,
        interval: process.env.NOTIFY_INTERVAL || 3600,
    },
    emailTitle : process.env.EMAIL_TITLE || 'New Event Detected',
    emailContent : process.env.EMAIL_CONTENT || 'Please check the event details',
    maxRetries : process.env.MAX_RETRIES || 5,
    eventInterval: process.env.EVENT_INTERVAL || 30000,
    port: process.env.PORT || 3000,
};
