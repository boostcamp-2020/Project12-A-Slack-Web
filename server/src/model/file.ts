import { DataTypes } from 'sequelize'
import DB from './db'

const File = DB.define(
  'file',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('VIDEO', 'IMAGE', 'FILE'),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  },
)

export default File
