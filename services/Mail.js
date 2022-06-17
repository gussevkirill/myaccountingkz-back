import nodemailer from 'nodemailer'
import { emailsLetterVariants } from '../utils.js'

class MailService {
    constructor() {
        this.trasporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'glavbux97@gmail.com',
                pass: 'xxjksdomsiykxqxp'
            }
        })
    }

    async send(type, body, file) {
        await this.trasporter.sendMail({
            from: 'nodemailer',
            to: 'lga-9797@mail.ru',
            text: '',
            subject: body['title'],
            html: emailsLetterVariants(type, body, file)
        })
    }
}


export default new MailService()