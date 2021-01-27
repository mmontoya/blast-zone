import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
	playerBombCollisionReducer,
	playerDamageCompleteReducer,
} from './reducers/playerReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { INITIAL_HEALTH } from './constants/playerConstants'

const reducer = combineReducers({
	playerBombCollision: playerBombCollisionReducer,
	playerDamageComplete: playerDamageCompleteReducer,
})

// Get initial value from
const initialState = {
	playerBombCollision: { health: INITIAL_HEALTH, bomb: null },
	playerDamageComplete: { health: null },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
