import { Request, Response, NextFunction } from 'express'
import { statusCode } from '@util/constant'

const createFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(statusCode.OK).json({
      success: true,
      data: { filePath: req.file.path, fileType: req.file.mimetype },
    })
  } catch (error) {
    return next(error)
  }
}

export default { createFile }
