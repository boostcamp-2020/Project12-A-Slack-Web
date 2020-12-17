import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'

class Thread extends Model {
  public readonly id: number

  public readonly createdAt?: Date

  public readonly updatedAt?: Date

  public readonly deletedAt?: Date
}

Thread.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'Thread',
    tableName: 'thread',
    paranoid: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
)

export default Thread
