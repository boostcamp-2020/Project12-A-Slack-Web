import nodemailer from 'nodemailer'

export interface mailReceiverType {
  toEmail: string
  name: string
  workspaceName: string
  workspaceId: string
}

const frontURL =
  process.env.NODE_ENV === 'development'
    ? process.env.FRONT_DOMAIN_DEVELOP
    : process.env.FRONT_DOMAIN_PRODUCTION

const sendGmail = async (param: mailReceiverType) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    host: 'smtp.gmlail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GOOGLE_EMAIL_USER_ID,
      pass: process.env.GOOGLE_EMAIL_USER_PASSWORD,
    },
  })
  const mailOptions = {
    from: process.env.GOOGLE_EMAIL_USER_ID,
    to: param.toEmail,
    subject: `당신을 I'm slack으로 초대합니다.`,
    html: `<h2>${param.name}이 당신을 ${param.workspaceName}으로 초대했습니다.</h2><p>하단의 이미지를 클릭하여 워크스페이스에 조인하세요!</p><a href=${frontURL}/workspace/join?workspace_id=${param.workspaceId}><img src='https://user-images.githubusercontent.com/63051473/102111765-273a5a80-3e7a-11eb-9b53-7511fe76d485.png' /></a>`,
  }
  console.log(mailOptions)
  const { error, info } = await transporter.sendMail(mailOptions)
  return { error, info }
}

export default sendGmail
