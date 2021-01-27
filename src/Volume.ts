import { Howl, Howler } from 'howler'
import SoundManager from './SoundManager'
import * as PIXI from 'pixi.js'
import Game from './Game'
import { Machine, interpret, assign } from 'xstate'
import { volumeMachine } from './machines/VolumeMachine'

class Volume {
	public volumeIcon: PIXI.Sprite
	public volumeLevel: number
	public game: Game
	public resourceName: string
	public volumeService: any
	public spriteSheet: PIXI.Spritesheet
	public prevVolume: number = 50

	constructor(game: Game, resourceName: string) {
		this.game = game
		this.resourceName = resourceName
		this.createIcon()
	}

	createMachine() {
		this.volumeService = interpret(volumeMachine)
			.onTransition(state => {
				const { volume } = state.context
				this.volumeLevel = volume
				console.log(volume)
				if (volume <= 0) {
					this.volumeIcon.texture = this.spriteSheet.textures['off.png']
					Howler.ctx.resume().then(() => {
						if (this.game.soundManager.sounds.bg_music.playing()) {
							this.game.soundManager.sounds.bg_music.pause()
						}
						// Enable to restart sound if in paused state
						// else {
						//
						// 	this.game.soundManager.sounds.bg_music.stop()
						// }
					})
				} else {
					// Music is not playing
					if (!this.game.soundManager.sounds.bg_music.playing()) {
						Howler.ctx.resume().then(() => {
							this.game.soundManager.sounds.bg_music.play()
						})
					}
					this.game.soundManager.sounds.bg_music.volume(volume / 100)
					// Change Icon
					if (volume > 0 && volume <= 30) {
						this.volumeIcon.texture = this.spriteSheet.textures['vol1.png']
					} else if (volume > 30 && volume <= 60) {
						this.volumeIcon.texture = this.spriteSheet.textures['vol2.png']
					} else if (volume > 60) {
						this.volumeIcon.texture = this.spriteSheet.textures['vol3.png']
					}
				}
			})
			.start()
	}

	createIcon() {
		let margin = 2
		this.spriteSheet = this.game.app.loader.resources[
			this.resourceName
		].spritesheet
		this.volumeIcon = new PIXI.Sprite(this.spriteSheet.textures['off.png'])
		this.volumeIcon.anchor.set(0.5)
		this.volumeIcon.scale.set(0.5)
		this.volumeIcon.x =
			this.game.app.view.width - this.volumeIcon.width - margin
		this.volumeIcon.y =
			this.game.app.view.height - this.volumeIcon.height - margin
		this.volumeIcon.interactive = true
		this.volumeIcon.cursor = 'pointer'
		this.game.app.stage.addChild(this.volumeIcon)

		this.volumeIcon.on('click', e => {
			if (this.volumeLevel > 0) {
				this.prevVolume = this.volumeLevel
				this.volumeService.send('OFF')
			} else {
				this.volumeService.send({ type: 'SET', payload: this.prevVolume })
			}
		})

		window.addEventListener('keydown', this.onKeyDown.bind(this))
		this.createMachine()
	}

	onKeyDown(e) {
		// + key pressed
		if (e.keyCode === 187) {
			this.volumeService.send('RAISE')
		}
		// - key pressed
		if (e.keyCode === 189) {
			this.volumeService.send('LOWER')
		}
	}
}

export default Volume
