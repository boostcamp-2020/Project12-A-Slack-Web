import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize'
import { dbType } from './index'

class Section extends Model {
  public readonly id: number

  public name!: string

  public readonly createdAt?: Date

  public readonly updatedAt?: Date

  public readonly deletedAt?: Date
}

Section.init(
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
    sequelize,
    modelName: 'Section',
    tableName: 'section',
    paranoid: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
)

export const associate = (db: dbType) => {
  db.Section.hasMany(db.UserChannelSection, {
    foreignKey: 'sectionId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.Section.belongsTo(db.User, { foreignKey: 'userId' })

  db.Section.belongsTo(db.Workspace, { foreignKey: 'workspaceId' })
}

export default Section
