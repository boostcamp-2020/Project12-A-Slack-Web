import { combineReducers } from 'redux'
import workspaceStore from './workspace.reducer'
import threadStore from './thread.reducer'

const rootReducer = combineReducers({
  workspaceStore,
  threadStore,
})

export default rootReducer
