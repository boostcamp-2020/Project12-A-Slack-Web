import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com')
const region = 'kr-standard'
const accessKey = process.env.NCP_ACCESS_KEY
const secretKey = process.env.NCP_SECRET_KEY

const S3 = new AWS.S3({
  endpoint,
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
})

const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: 'slack-clone',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname))
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

export default upload
