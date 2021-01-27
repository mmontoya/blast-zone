import * as PIXI from 'pixi.js'
import store from './store'
import { INITIAL_HEALTH } from './constants/playerConstants'
import Healthbar from './Healthbar'

class Character {
	public resourceName: string
	public app: PIXI.Application
	public charContainer: PIXI.Container
	public sprite: PIXI.Sprite
	public healthbar: Healthbar
	public startHealth: number = INITIAL_HEALTH
	private _health: number
	public isDead: boolean
	public spriteSheet: PIXI.Spritesheet
	public didCollide: boolean

	public didExplode: boolean

	constructor(app: PIXI.Application, resourceName: string) {
		this.resourceName = resourceName
		this.app = app
		this.charContainer = new PIXI.Container()
		this.sprite = this.createCharacter()
		this._health = this.startHealth
		this.isDead = false
		this.didCollide = false

		store.subscribe(() => {
			let { health, bomb } = store.getState().playerBombCollision

			this.health = health

			if (health >= 0) {
				//console.log(health)
				let percent = this.health / this.startHealth
				this.healthbar.bar.scale.x = percent
				this.healthbar.display.text = Math.round(percent * 100) + '%'
				// If player doesn't move the bomb continues doing damage over time
				setTimeout(() => {
					// remove bomb
					this.app.stage.removeChild(bomb)
				}, 2000)
			} else {
				this.isDead = true
			}
		})
	}

	get health() {
		return this._health
	}

	set health(num) {
		this._health = num
	}

	createCharacter() {
		this.spriteSheet = this.app.loader.resources[this.resourceName].spritesheet
		//console.log('This resources', this.app.loader.resources)
		//console.log(this.spriteSheet)
		let character = new PIXI.AnimatedSprite(
			this.spriteSheet.animations['walkSouth']
		)
		character.anchor.set(0.5)
		character.animationSpeed = 0.5
		character.loop = false
		character.x = this.app.view.width / 2
		character.y = this.app.view.height / 2
		character.gotoAndStop(1)
		this.charContainer.addChild(character)
		this.app.stage.addChild(this.charContainer)
		return character
	}
	addHealth(healthbar: Healthbar) {
		healthbar.sprite.x = this.sprite.x
		healthbar.sprite.y = this.sprite.y - 40
		this.healthbar = healthbar
		this.charContainer.addChild(healthbar.sprite)
	}
}

export default Character
