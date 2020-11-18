import { DataTypes } from 'sequelize'
import DB from './db'

const Channel = DB.define(
  'channel',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('CHANNEL', 'DM'),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  },
)

export default Channel
