import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize'
import { dbType } from './index'

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

export const associate = (db: dbType) => {
  db.Thread.belongsTo(db.Channel, { foreignKey: 'channelId' })

  db.Thread.belongsTo(db.User, { foreignKey: 'userId' })

  db.Thread.hasMany(db.Message, {
    foreignKey: 'threadId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
}

export default Thread
