import { Model, DataTypes } from 'sequelize'
import sequelize from './sequelize'
import { dbType } from './index'

class UserChannelSection extends Model {
  public readonly id: number

  public readonly createdAt?: Date

  public readonly updatedAt?: Date

  public readonly deletedAt?: Date
}

UserChannelSection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'UserChannelSection',
    tableName: 'userChannelSection',
    paranoid: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
)

export const associate = (db: dbType) => {
  db.UserChannelSection.belongsTo(db.Section, { foreignKey: 'sectionId' })
}

export default UserChannelSection
