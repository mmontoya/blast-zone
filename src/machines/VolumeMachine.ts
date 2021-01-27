import { Machine, assign } from 'xstate'

interface context {
	volume: number
}

// Action to increment the volume
const raiseVolume = assign({
	volume: (context: context, event) => context.volume + 10,
})

const lowerVolume = assign({
	volume: (context: context, event) => context.volume - 10,
})

const turnOff = assign({
	volume: (context: context, event) => 0,
})

const setVolume = assign({
	volume: (context: context, event: any) => event.payload,
})

// Guard to check if the volume is maxed out
function volumeIsMax(context: context, event) {
	return context.volume >= 100
}

// Guard to check if the volume is min
function volumeIsMin(context: context, event) {
	return context.volume <= 0
}

export const volumeMachine = Machine(
	{
		id: 'volumeMachine',
		initial: 'off',
		context: {
			volume: 0,
		},
		states: {
			off: {
				on: {
					RAISE: {
						target: 'raising',
						actions: 'raiseVolume',
					},
					SET: {
						target: 'raising',
						actions: 'setVolume',
					},
				},
			},
			raising: {
				// Transient transition
				always: {
					target: 'max',
					cond: 'volumeIsMax',
				},
				on: {
					RAISE: {
						target: 'raising',
						actions: 'raiseVolume',
					},
					LOWER: {
						target: 'lowering',
						actions: 'lowerVolume',
					},
					OFF: {
						target: 'off',
						actions: 'turnOff',
					},
				},
			},
			lowering: {
				// Transient transition
				always: {
					target: 'off',
					cond: 'volumeIsMin',
				},
				on: {
					LOWER: {
						target: 'lowering',
						actions: 'lowerVolume',
					},
					RAISE: {
						target: 'raising',
						actions: 'raiseVolume',
					},
					OFF: {
						target: 'off',
						actions: 'turnOff',
					},
				},
			},
			max: {
				on: {
					LOWER: {
						target: 'lowering',
						actions: 'lowerVolume',
					},
					OFF: {
						target: 'off',
						actions: 'turnOff',
					},
				},
			},
		},
	},
	{
		actions: { raiseVolume, lowerVolume, turnOff, setVolume },
		guards: { volumeIsMax, volumeIsMin },
	}
)
