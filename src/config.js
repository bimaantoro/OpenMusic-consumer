require('dotenv').config();

const config = {
  mailer: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: Number(process.env.SMPTP_PORT),
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASSWORD,
  },
  rabbitMq: {
    url: process.env.RABBITMQ_SERVER,
  },
};

module.exports = config;
