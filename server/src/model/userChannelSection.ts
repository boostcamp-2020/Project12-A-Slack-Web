import { DataTypes } from 'sequelize'
import DB from './db'

const UserChannelSection = DB.define(
  'userChannelSection',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  },
)

export default UserChannelSection
