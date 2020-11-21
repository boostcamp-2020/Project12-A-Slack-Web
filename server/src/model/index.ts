import User, { associate as associateUser } from './user'
import Workspace, { associate as associateWorkspace } from './workspace'
import Section, { associate as associateSection } from './section'
import Message, { associate as associateMessage } from './message'
import Reaction, { associate as associateReaction } from './reaction'
import Thread, { associate as associateThread } from './thread'
import Channel, { associate as associateChannel } from './channel'
import UserChannelSection, {
  associate as associateUserChannelSection,
} from './userChannelSection'
import File, { associate as associateFile } from './file'
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
