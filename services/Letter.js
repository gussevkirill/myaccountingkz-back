import mailService from './Mail.js'
import { v4 } from 'uuid'
import axios from 'axios'
import path from 'path'



class Letter {
    async create(body, file) {
        try {

            let fileName = null
            if (file) {
                fileName = `${v4()}.${file.name.split('.').pop()}`
                file.mv(`${path.resolve()}\\static\\${fileName}`)
                // return
            }
            
            await mailService.send(body['message'], { ...body }, fileName)

            return {
                message: 'Письмо успешно было доставлено, вам обязательно ответят'
            }
        } catch (error) {
            return {
                error
            }
        }
    }
}


export const LetterService = new Letter()