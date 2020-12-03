import { combineReducers } from 'redux'
import workspaceStore from './workspace.reducer'
import threadStore from './thread.reducer'
import channelStore from './channel.reducer'

const rootReducer = combineReducers({
  workspaceStore,
  threadStore,
  channelStore,
})

export default rootReducer
