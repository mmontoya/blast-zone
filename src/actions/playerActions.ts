import {
	PLAYER_BOMB_COLLISION,
	PLAYER_DAMAGE_COMPLETE,
} from '../constants/playerConstants'

export const bombCollide: any = amount => dispatch => {
	dispatch({
		type: PLAYER_BOMB_COLLISION,
		payload: amount,
	})
}
export const damageComplete: any = health => dispatch => {
	dispatch({
		type: PLAYER_DAMAGE_COMPLETE,
		payload: health,
	})
}
