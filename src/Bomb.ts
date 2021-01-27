import * as PIXI from 'pixi.js'
import PoissonDiskSampling from 'poisson-disk-sampling'
import { BOMB_DAMAGE } from './constants/bombConstants'
import Explosion from './Explosion'
import store from './store'
import SoundManager from './SoundManager'
import Scorch from './Scorch'
import { Howler } from 'howler'

class Bomb {
	public static damage: number = BOMB_DAMAGE
	public app: PIXI.Application
	public resourceName: string
	public distanceThreshold: number
	public bombs: Array<PIXI.Sprite>
	public didExplode: boolean
	public sound: SoundManager

	constructor(app: PIXI.Application, resourceName: string, distance: number) {
		this.app = app
		this.resourceName = resourceName
		this.distanceThreshold = distance
		this.bombs = this.placeBombs()
		this.didExplode = false
		this.sound = new SoundManager()

		store.subscribe(() => {
			let { health, bomb } = store.getState().playerBombCollision

			// set bomb to explode
			if (!this.didExplode) {
				bomb.visible = false
				let explosion = new Explosion(this.app, 'explosion')
				explosion.animation.x = bomb.x
				explosion.animation.y = bomb.y
				this.app.stage.addChild(explosion.animation)

				explosion.animation.gotoAndPlay(1)

				// Add Scorch to BG
				let scorch = new Scorch(this.app, 'scorch')
				scorch.sprite.x = bomb.x
				scorch.sprite.y = bomb.y
				scorch.sprite.rotation = Math.random() * 360

				;(this.app.stage.children[0] as PIXI.Container).addChild(scorch.sprite)

				// Play Sound
				this.sound.sounds.explosion.play()

				this.didExplode = true

				explosion.animation.onComplete = () => {
					explosion.animation.visible = false
					//this.didExplode = false
					setTimeout(() => {
						this.didExplode = false
					}, 1000)
				}
			}
		})
	}

	placeBombs() {
		const tntTexture = this.app.loader.resources[this.resourceName].texture
		const margin = 50
		const tntArray = []

		let p = new PoissonDiskSampling({
			shape: [
				this.app.view.width - 2 * margin,
				this.app.view.height - 2 * margin,
			],
			minDistance: this.distanceThreshold,
			maxDistance: this.distanceThreshold * 1.5,
			tries: 10,
		})

		let points = p.fill()

		points.map((point: number, index: number) => {
			let tnt = new PIXI.Sprite(tntTexture)

			//tnt.exploded = false
			//tnt.visible = false
			//tnt.alpha = 0
			tnt.name = 'tnt' + index
			tnt.x = point[0] + margin
			tnt.y = point[1] + margin
			tnt.anchor.set(0.5)
			tnt.scale.set(0.3)

			tntArray.push(tnt)
			this.app.stage.addChild(tnt)
		})

		//console.log(`${points.length} bombs!`)
		return tntArray
	}
}

export default Bomb
