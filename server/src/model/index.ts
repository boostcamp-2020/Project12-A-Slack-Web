import User from './user.model'
import Workspace from './workspace.model'
import Section from './section.model'
import Message from './message.model'
import Reaction from './reaction.model'
import Thread from './thread.model'
import Channel from './channel.model'
import UserChannelSection from './userChannelSection.model'
import File from './file.model'
import { sequelize } from './sequelize'

const db = {
  User,
  Workspace,
  Section,
  Message,
  Reaction,
  Thread,
  Channel,
  UserChannelSection,
  File,
}

const initDB = () => {
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

  db.File.belongsTo(db.Message, { foreignKey: 'messageId' })

  db.Message.belongsTo(db.User, { foreignKey: 'userId' })

  db.Message.hasMany(db.Reaction, {
    foreignKey: 'messageId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.Message.belongsTo(db.Thread, { foreignKey: 'threadId' })

  db.Message.hasMany(db.File, {
    foreignKey: 'messageId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.Reaction.belongsTo(db.Message, { foreignKey: 'messageId' })

  db.Reaction.belongsTo(db.User, { foreignKey: 'userId' })

  db.Section.hasMany(db.UserChannelSection, {
    foreignKey: 'sectionId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.Section.belongsTo(db.User, { foreignKey: 'userId' })

  db.Section.belongsTo(db.Workspace, { foreignKey: 'workspaceId' })

  db.Thread.belongsTo(db.Channel, { foreignKey: 'channelId' })

  db.Thread.belongsTo(db.User, { foreignKey: 'userId' })

  db.Thread.hasMany(db.Message, {
    foreignKey: 'threadId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })

  db.User.belongsToMany(db.Workspace, {
    as: 'workspace',
    through: 'userWorkspace',
    foreignKey: 'userId',
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

  db.UserChannelSection.belongsTo(db.Section, { foreignKey: 'sectionId' })

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

  sequelize
    .sync({ force: false })
    .then(() => console.log('DB connent'))
    .catch((err) => {
      console.error(err)
    })
}

export default initDB
