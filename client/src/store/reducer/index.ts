import { combineReducers } from 'redux'
import socketStore from './socket.reducer'
import workspaceStore from './workspace.reducer'
import threadStore from './thread.reducer'
import channelStore from './channel.reducer'

const rootReducer = combineReducers({
  socketStore,
  workspaceStore,
  threadStore,
  channelStore,
})

export default rootReducer
