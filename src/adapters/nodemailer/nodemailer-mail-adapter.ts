import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a16f095cb2f84c",
    pass: "d5bd6962f68494"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body } : SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <noreplay@feedget.com>',
      to: 'Vinícius Santos <viniciusgabriel.rs@hotmail.com>',
      subject,
      html: body
    })  
  };
}