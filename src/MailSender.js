const nodemailer = require('nodemailer');
const config = require('./config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.mailer.smtpHost,
      port: config.mailer.smtpPort,
      auth: {
        user: config.mailer.smtpUser,
        pass: config.mailer.smtpPass,
      },
    });
  }

  async sendMail(targetEmail, content) {
    const message = {
      from: 'Open Music App',
      to: targetEmail,
      subject: 'Export Playlist',
      text: 'Here is the playlist export result attachment',
      attachments: [
        {
          filename: 'playlists.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
