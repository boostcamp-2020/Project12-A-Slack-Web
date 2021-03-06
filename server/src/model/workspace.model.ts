import { Model, DataTypes } from 'sequelize'
import { sequelize } from './sequelize'

class Workspace extends Model {
  public readonly id: number

  public name!: string

  public imageUrl?: string
}

Workspace.init(
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
    imageUrl: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Workspace',
    tableName: 'workspace',
    paranoid: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
)

export default Workspace
