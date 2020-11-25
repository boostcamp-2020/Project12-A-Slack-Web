import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize'
import { dbType } from './index'

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

export const associate = (db: dbType) => {
  db.Workspace.belongsToMany(db.User, {
    as: 'user',
    through: 'userWorkspace',
    foreignKey: 'workspaceId',
  })

  db.Workspace.hasMany(db.Channel, {
    sourceKey: 'id',
    foreignKey: 'workspaceId',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.Workspace.hasMany(db.Section, {
    sourceKey: 'id',
    foreignKey: 'workspaceId',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
}

export default Workspace
