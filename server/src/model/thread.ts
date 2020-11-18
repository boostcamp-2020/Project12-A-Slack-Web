import { DataTypes } from 'sequelize'
import DB from './db'

const Thread = DB.define(
  'thread',
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

export default Thread
