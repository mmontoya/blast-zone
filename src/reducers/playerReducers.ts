import {
	PLAYER_BOMB_COLLISION,
	PLAYER_DAMAGE_COMPLETE,
} from '../constants/playerConstants'

interface PlayerBombCollisionAction {
	type: string
	payload: { dmg: number; bomb: PIXI.Sprite }
}

interface DamageAction {
	type: string
	payload: { health: number }
}

export const playerBombCollisionReducer = (
	state = { health: 0, bomb: null },
	action: PlayerBombCollisionAction
) => {
	switch (action.type) {
		case PLAYER_BOMB_COLLISION:
			console.log(state.health)
			console.log(state.health - action.payload.dmg)
			return {
				health: state.health - action.payload.dmg,
				bomb: action.payload.bomb,
			}
		default:
			return state
	}
}

export const playerDamageCompleteReducer = (
	state = { health: null },
	action: DamageAction
) => {
	switch (action.type) {
		case PLAYER_DAMAGE_COMPLETE:
			console.log(action)
			return {
				health: action.payload.health,
			}
		default:
			return state
	}
}
