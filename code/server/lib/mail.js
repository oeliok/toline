/**
 * Created by oeli on 16-10-17.
 */
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// 开启一个 SMTP 连接池
var transport = nodemailer.createTransport(smtpTransport({
    host: "smtp.qq.com", // 主机
    secure: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: "1028236806@qq.com", // 账号
        pass: "wvikcxfijbfabfhj" // 密码
    }
}));

exports.sendmail = function (to,subject,html,res) {
    // 设置邮件内容
    var mailOptions = {
        from: "oeli <1028236806@qq.com>", // 发件地址
        to: to, // 收件列表
        subject: subject, // 标题
        html: html // html 内容
    };
    // 发送邮件
    transport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.error(error);
            res.json({code:-1});
        } else {
            console.log(response);
            res.json({code:1});
        }
        transport.close(); // 如果没用，关闭连接池
    });
};