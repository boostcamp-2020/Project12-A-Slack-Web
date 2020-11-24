import User, { associate as associateUser } from './user.model'
import Workspace, { associate as associateWorkspace } from './workspace.model'
import Section, { associate as associateSection } from './section.model'
import Message, { associate as associateMessage } from './message.model'
import Reaction, { associate as associateReaction } from './reaction.model'
import Thread, { associate as associateThread } from './thread.model'
import Channel, { associate as associateChannel } from './channel.model'
import UserChannelSection, {
  associate as associateUserChannelSection,
} from './userChannelSection'
import File, { associate as associateFile } from './file.model'
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

export type dbType = typeof db

associateUser(db)
associateWorkspace(db)
associateSection(db)
associateMessage(db)
associateReaction(db)
associateThread(db)
associateChannel(db)
associateUserChannelSection(db)
associateFile(db)

const initDB = () => {
  sequelize
    .sync({ force: false })
    .then(() => console.log('DB connent'))
    .catch((err) => {
      console.error(err)
    })
}

export default initDB
