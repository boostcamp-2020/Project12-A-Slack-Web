import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'

class Reaction extends Model {
  public readonly id: number

  public content!: string

  public readonly createdAt?: Date

  public readonly updatedAt?: Date

  public readonly deletedAt?: Date
}

Reaction.init(
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
    sequelize,
    modelName: 'Reaction',
    tableName: 'reaction',
    paranoid: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
)

export default Reaction
