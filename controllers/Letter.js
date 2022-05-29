import { LetterService } from "../services/Letter.js"


class Letter {
    async create(req,res){
        const result = await LetterService.create(req.body,req.files?.file)
        return res.json(result)
    }
}

export const LetterController = new Letter()