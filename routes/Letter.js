import pkg from 'express'
import { LetterController } from '../controllers/Letter.js'


const { Router } = pkg

const router = Router()


router.post('/letters', LetterController.create)
// router.get('/check_pay', (req, res) => {
//     console.log('req.body', req.body)
// })  


export default router
