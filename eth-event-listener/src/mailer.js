const nodemailer = require('nodemailer');
const { smtp ,maxRetries} = require('../config/config');
const logger = require('./utils').logger;

const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    auth: {
        user: smtp.user,
        pass: smtp.pass,
    },
});

let lastEmailSentTime = 0;
const emailInterval = smtp.interval; // 设置时间间隔为60秒 60 * 1000
const emailMaxRetries = maxRetries; // 最大重试次数

async function sendEmail(subject, text) {
    const currentTime = Date.now();
    //console.log(`currentTime: ${currentTime}, lastEmailSentTime: ${lastEmailSentTime}`);
    //console.log("emailInterval: "+emailInterval);
    if (currentTime - lastEmailSentTime < emailInterval) {
        logger.warn('Email not sent: Interval not reached');
        return;
    }
    const mailOptions = {
        from: smtp.user,
        to: smtp.emails.join(','),
        subject,
        text,
    };
    let success = await attemptToSendEmail(mailOptions,transporter);
    if (success) {
        lastEmailSentTime = currentTime;
    }
}

async function attemptToSendEmail(mailOptions, transporter) {
    for (let attempt = 0; attempt < emailMaxRetries; attempt++) {
        try {
            const info = await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        reject(err);  // 如果发送邮件失败，reject 错误
                    } else {
                        resolve(info);  // 如果成功，返回邮件信息
                    }
                });
            });

            // 邮件发送成功
            logger.info(`Email sent: ${info.response}`);
            return true;  // 成功返回 true

        } catch (err) {
            // 如果是最后一次尝试失败，记录错误并发送告警邮件
            if (attempt === emailMaxRetries - 1) {
                logger.error(`Email send error: ${err.message}`);
                sendAlertEmail(err.message);
            } else {
                logger.warn(`Email send error: ${err.message}. Retrying attempt ${attempt + 1}/${emailMaxRetries}`);
            }
        }
    }

    return false;  // 如果所有尝试都失败，返回 false
}


// 发送告警邮件
async function sendAlertEmail(error) {
    const mailOptions = {
      from: smtp.user,
      to: smtp.adminEmail,
      subject: '服务错误告警',
      text: `服务发生错误，已达到最大重试次数。\n错误信息: ${error}}`
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      logger.info(`告警邮件发送成功: ${info.response}`);
    } catch (err) {
      logger.info(`告警邮件发送失败: ${err}`);
    }
  }

module.exports = { sendEmail, sendAlertEmail };
