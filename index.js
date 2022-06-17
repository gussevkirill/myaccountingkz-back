import express from 'express'
import cors from 'cors'
import lettersRouter from './routes/Letter.js'
import fileUpload from 'express-fileupload'
import path from 'path'

const app = express()

const PORT = 3001

app.use(cors(
    {
        // origin: 'http://myaccounting97.ru'
        origin: 'http://localhost:3000'
    }
))

app.use(express.json())
app.use(fileUpload())
app.use(express.static(`static`))
app.use(lettersRouter)

app.use('/download/:fileName',(req,res)=>{
    res.download(`${path.resolve()}/static/${req.params.fileName}`)
    res.status(200)
})

const startServer = () => {
    app.listen(PORT, () => {
        console.log('server started on port:', PORT)
    })
}

startServer()


