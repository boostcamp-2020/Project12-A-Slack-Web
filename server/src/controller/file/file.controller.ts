import { Request, Response, NextFunction } from 'express'
import fileService from '@service/file.service'

const createFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, json } = await fileService.createFile({
      url: req.file.path,
      type: req.file.mimetype,
      messageId: +req.body.messageId,
    })
    return res.status(code).json(json)
  } catch (error) {
    return next(error)
  }
}

export default { createFile }
