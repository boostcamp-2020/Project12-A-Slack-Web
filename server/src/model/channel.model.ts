import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'

class Channel extends Model {
  public readonly id: number

  public name!: string

  public type!: string

  public isHead!: string

  public readonly createdAt?: Date

  public readonly updatedAt?: Date

  public readonly deletedAt?: Date
}

Channel.init(
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
      type: DataTypes.ENUM('PUBLIC', 'PRIVATE', 'DM'),
      allowNull: false,
    },
    isHead: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Channel',
    tableName: 'channel',
    paranoid: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
)

export default Channel
