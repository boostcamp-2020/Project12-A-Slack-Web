import { DataTypes } from 'sequelize'
import DB from './db'

const User = DB.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    googleId: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    profileImageUrl: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  },
)

export default User
