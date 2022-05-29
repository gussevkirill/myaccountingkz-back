import nodemailer from 'nodemailer'
import { emailsLetterVariants } from '../utils.js'

class MailService {
    constructor() {
        this.trasporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "glavbux97@gmail.com",
                pass: "58133dommasik",
            }
        })
    }

    async send(type, body,file) {
        console.log('to,body', type, body,file)
        await this.trasporter.sendMail({
            from: 'glavbux97@gmail.com',
            to: 'lga-9797@mail.ru',
            text: '',
            subject: body['title'],
            html: emailsLetterVariants(type, body,file)
        })
    }
}


export default new MailService()