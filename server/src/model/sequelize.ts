import { Sequelize, Dialect, Options } from 'sequelize'

type configType = {
  database: string
  username: string
  password: string
  host: string
  port: number
  dialect: Dialect
  timezone: string
}

const config: configType = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  dialect: 'mysql',
  timezone: '+09:00',
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { ...config, define: { timestamps: true } as unknown } as Options,
)

export { sequelize }

export default sequelize
