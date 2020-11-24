import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize'
import { dbType } from './index'

class File extends Model {
  public readonly id: number

  public url!: string

  public type!: string

  public readonly createdAt?: Date

  public readonly updatedAt?: Date

  public readonly deletedAt?: Date
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('VIDEO', 'IMAGE', 'FILE'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'File',
    tableName: 'file',
    paranoid: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
)

export const associate = (db: dbType) => {
  db.File.belongsTo(db.Message, { foreignKey: 'messageId' })
}

export default File
