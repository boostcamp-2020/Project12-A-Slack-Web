import { Request, Response } from 'express'
import sendGmail, { mailReceiverType } from '@service/mail.service'
import { statusCode } from '@util/constant'

const sendEmail = async (req: Request, res: Response) => {
  const mailTarget: mailReceiverType = {
    toEmail: req.body.toEmail,
    name: req.body.name,
    workspaceName: req.body.workspaceName,
    workspaceId: req.body.workspaceId,
  }
  const response = await sendGmail(mailTarget)
  if (response.error) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json({ success: false, error: response.error })
  }
  return res.status(statusCode.OK).json({ success: true })
}

export default { sendEmail }
