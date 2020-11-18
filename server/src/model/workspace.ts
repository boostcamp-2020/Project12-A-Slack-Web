import { DataTypes } from 'sequelize'
import DB from './db'

const Workspace = DB.define(
  'workspace',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  },
)

export default Workspace
