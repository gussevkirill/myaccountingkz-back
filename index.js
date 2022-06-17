import express from 'express'
import cors from 'cors'
import lettersRouter from './routes/Letter.js'
import fileUpload from 'express-fileupload'
import path from 'path'
import { LetterService } from './services/Letter.js'
import mailService from './services/Mail.js'
import { config } from 'dotenv'

config()
const app = express()

const PORT = 3001

app.use(cors(
    {
        origin: process.env.SITE_URL
    }
))

console.log('process.env.SITE_URL', process.env.SITE_URL)

app.use('/check_pay', async (req, res, next) => {
    console.log('req', req.body)
    console.log('first', LetterService.letterFields)

    if (!req.body) return res.send({ Error: 'fail' })
    const { code } = req.body
    const { message, fileName, ...fields } = LetterService.letterFields
    if (code === 'ok') {
        await mailService.send(message, fields, fileName)
        return
    }
    next()
})

app.use(express.json())
app.use(fileUpload())
app.use(express.static(`static`))
app.use(lettersRouter)

app.use('/download/:fileName', (req, res) => {
    res.download(`${path.resolve()}/static/${req.params.fileName}`)
    res.status(200)
})

const startServer = () => app.listen(PORT, () => console.log('server started on port:', PORT))

startServer()


