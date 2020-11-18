import DB from './db'
import User from './user'
import Workspace from './workspace'
import Section from './section'
import Message from './message'
import Reaction from './reaction'
import Thread from './thread'
import Channel from './channel'
import UserChannelSection from './userChannelSection'

const initDB = () => {
  User.belongsToMany(Workspace, {
    as: 'workspace',
    through: 'userWorkspace',
  })

  Workspace.belongsToMany(User, {
    as: 'user',
    through: 'userWorkspace',
  })

  User.belongsToMany(Channel, {
    as: 'channel',
    through: UserChannelSection,
  })

  Channel.belongsToMany(User, {
    as: 'user',
    through: UserChannelSection,
  })

  Section.hasMany(UserChannelSection, {
    foreignKey: 'sectionId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  UserChannelSection.belongsTo(Section)

  User.hasMany(Message, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Message.belongsTo(User)

  Message.hasMany(Reaction, {
    foreignKey: 'messageId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Reaction.belongsTo(Message)

  User.hasMany(Reaction, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Reaction.belongsTo(User)

  Workspace.hasMany(Channel, {
    sourceKey: 'id',
    foreignKey: 'workspaceId',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Channel.belongsTo(Workspace)

  User.hasMany(Section, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Section.belongsTo(User)

  Workspace.hasMany(Section, {
    sourceKey: 'id',
    foreignKey: 'workspaceId',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Section.belongsTo(Workspace)

  Channel.hasMany(Thread, {
    sourceKey: 'id',
    foreignKey: 'channelId',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Thread.belongsTo(Channel)

  User.hasMany(Thread, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Thread.belongsTo(User)

  Thread.hasMany(Message, {
    foreignKey: 'threadId',
    sourceKey: 'id',
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL',
  })
  Message.belongsTo(Thread)

  DB.sync()
    .then(() => console.log('DB connent'))
    .catch((err) => {
      console.error(err)
    })
}

export default initDB
