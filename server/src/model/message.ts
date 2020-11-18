import { DataTypes } from 'sequelize'
import DB from './db'

const Message = DB.define(
  'message',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isHead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  },
)

export default Message
