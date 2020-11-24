import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize'
import { dbType } from './index'

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
      unique: true,
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

export const associate = (db: dbType) => {
  db.User.belongsToMany(db.Workspace, {
    as: 'workspace',
    through: 'userWorkspace',
  })

  db.User.belongsToMany(db.Channel, {
    as: 'channel',
    through: db.UserChannelSection,
  })

  db.User.hasMany(db.Message, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.User.hasMany(db.Reaction, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.User.hasMany(db.Section, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.User.hasMany(db.Thread, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
}

export default User
