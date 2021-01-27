import * as PIXI from 'pixi.js'
import Character from './Character'
import MovementManager from './Movement'
import store from './store'
import Bomb from './Bomb'
import Healthbar from './Healthbar'
import { bombCollide, damageComplete } from './actions/playerActions'
import SoundManager from './SoundManager'
import Volume from './Volume'
import { Howler } from 'howler'

class Game {
	public app: PIXI.Application
	public bomb: Bomb
	public player: Character
	public healthbar: Healthbar
	public movementManager: MovementManager
	public background: PIXI.Container
	public soundManager: SoundManager
	public volume: Volume

	constructor({ width, height, backgroundColor }) {
		this.app = new PIXI.Application({
			width: width,
			height: height,
			backgroundColor: backgroundColor,
		})

		document.body.appendChild(this.app.view)

		this.app.loader
			.add('boy', './assets/boy.json')
			.add('healthbar', './assets/healthbar.png')
			// .add('bush', './assets/bush.png')
			.add('tnt', './assets/tnt.png')
			.add('scorch', './assets/scorch.png')
			.add('explosion', './assets/explosion.json')
			.add('volume', './assets/volume_icon.json')
			.load(this.setup.bind(this))
	}
	setup() {
		this.background = new PIXI.Container()
		this.app.stage.addChild(this.background)
		this.bomb = new Bomb(this.app, 'tnt', 150)
		this.player = new Character(this.app, 'boy')
		this.healthbar = new Healthbar(this.app, 'healthbar')
		this.player.addHealth(this.healthbar)
		this.movementManager = new MovementManager()
		this.volume = new Volume(this, 'volume')
		this.soundManager = new SoundManager()

		this.app.ticker.add(this.gameLoop.bind(this))
	}

	boundsIntersect(a: PIXI.DisplayObject, b: PIXI.DisplayObject) {
		let aBox = a.getBounds()
		let bBox = b.getBounds()

		return (
			aBox.x + aBox.width > bBox.x &&
			aBox.x < bBox.x + bBox.width &&
			aBox.y + aBox.height > bBox.y &&
			aBox.y < bBox.y + bBox.height
		)
	}

	gameLoop(delta: number) {
		this.movementManager.bindToKeys(this.player)
		this.bomb.bombs.map(element => {
			// Detect collison with bomb
			if (
				this.boundsIntersect(this.player.sprite, element) &&
				this.app.stage.children.indexOf(element) !== -1
			) {
				store.dispatch(bombCollide({ dmg: Bomb.damage, bomb: element }))
			}
		})
	}
}

export default Game
