import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize'
import { dbType } from './index'

class Channel extends Model {
  public readonly id: number

  public name!: string

  public type!: string

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

export const associate = (db: dbType) => {
  db.Channel.belongsToMany(db.User, {
    as: 'user',
    through: db.UserChannelSection,
  })

  db.Channel.belongsTo(db.Workspace, { foreignKey: 'workspaceId' })

  db.Channel.hasMany(db.Thread, {
    sourceKey: 'id',
    foreignKey: 'channelId',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
}

export default Channel
