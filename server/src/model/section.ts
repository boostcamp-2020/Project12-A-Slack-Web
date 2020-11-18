import { DataTypes } from 'sequelize'
import DB from './db'

const Section = DB.define(
  'section',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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

export default Section
