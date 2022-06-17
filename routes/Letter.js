import pkg from 'express'
import { LetterController } from '../controllers/Letter.js'

const { Router } = pkg

const router = Router()

router.post('/letters', LetterController.create)

export default router
