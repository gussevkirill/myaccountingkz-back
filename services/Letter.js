import mailService from './Mail.js'
import path from 'path'
import { halyk } from '../halyk.js'
import axios from 'axios'
import { v4 } from 'uuid'


class Letter {

    letterFields = {}

    async create(body, file) {
        try {

            let fileName = null
            if (file) {
                fileName = `${v4()}.${file.name.split('.').pop()}`
                file.mv(`${path.resolve()}\\static\\${fileName}`)
            }

            if (!body['message'].match(/(question)/)) {
                await mailService.send(body['message'], { ...body }, fileName)
                return {
                    message: 'Письмо успешно было доставлено, вам обязательно ответят'
                }
            }

            const formData = new URLSearchParams()
            const invoiceID = v4().replace(/\D/g,'').slice(0, 11)
            formData.append('grant_type', 'client_credentials')
            formData.append('scope', 'webapi usermanagement email_send verification statement statistics payment')
            formData.append('client_id', 'MYACCOUNTING97.RU')
            formData.append('client_secret', '()0R)6OBj!wjZwUH')
            formData.append('invoiceID', invoiceID)
            formData.append('currency', 'KZT')
            formData.append('terminal', '3ad196d0-0812-4866-9499-a7ed7d78bef3')
            formData.append('postLink', `${process.env.SITE_URL}/check_pay`)

            let amount = 0

            if (body.consultation_type === 'phone') {
                amount = 10000
                formData.append('amount', amount) //10k
            }
            else if (body.consultation_type === 'mail') {
                amount = 5000
                formData.append('amount', amount) //5k
            }


            this.letterFields = { ...body, fileName }

            const { data: token } = await axios.post('https://epay-oauth.homebank.kz/oauth2/token', formData)

            const link = halyk.pay({
                invoiceId: invoiceID,
                backLink: "http://myaccounting97.ru",
                failureBackLink: "http://myaccounting97.ru",
                postLink: `${process.env.SITE_URL}/check_pay`,
                language: "RU",
                description: "Оплата услуги",
                accountId: Math.random(),
                terminal: "3ad196d0-0812-4866-9499-a7ed7d78bef3",
                amount: amount,
                currency: "KZT",
                cardSave: false,
                auth: token
            })
            return { link }

        } catch (error) {
            return {
                error
            }
        }
    }
}


export const LetterService = new Letter()