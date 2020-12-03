import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'

class User extends Model {
  public readonly id: number

  public email!: string

  public name!: string

  public google!: string

  public profileImageUrl?: string

  public readonly createdAt?: Date

  public readonly updatedAt?: Date

  public readonly deletedAt?: Date
}

User.init(
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
    sequelize,
    modelName: 'User',
    tableName: 'user',
    paranoid: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
)

export default User
