import { DataTypes } from 'sequelize'
import DB from './db'

const Reaction = DB.define(
  'reaction',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  },
)

export default Reaction
