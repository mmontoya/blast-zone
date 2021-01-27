import * as PIXI from 'pixi.js'

class Healthbar {
	public app: PIXI.Application
	public resourceName: string
	public sprite: PIXI.Sprite
	public bar: PIXI.Sprite
	public display: PIXI.Text

	constructor(app: PIXI.Application, resourceName: string) {
		this.app = app
		this.resourceName = resourceName
		this.sprite = this.createHealthbar()
	}

	createHealthbar() {
		let texture = this.app.loader.resources[this.resourceName].texture
		let sprite = new PIXI.Sprite(texture)
		sprite.anchor.set(0.5)

		const bar = new PIXI.Graphics()
		bar.lineStyle(1, 0xfff0000, 1)
		bar.beginFill(0xff0000)
		bar.drawRect(0, 0, 74, 7)
		bar.endFill()
		//bar.pivot = (0, 0.5)
		const barTexture = this.app.renderer.generateTexture(
			bar,
			PIXI.SCALE_MODES.LINEAR,
			1
		)
		const barSprite = new PIXI.Sprite(barTexture)
		barSprite.anchor.set(0, 0)
		barSprite.x = -22
		barSprite.y = -4
		sprite.addChild(barSprite)
		this.bar = barSprite

		const style = new PIXI.TextStyle({
			fill: 'white',
			align: 'center',
			fontFamily: 'Helvetica',
			fontSize: 10,
			lineJoin: 'round',
			wordWrap: false,
		})
		const text = new PIXI.Text('100%', style)
		text.x = -50
		text.y = -7
		//text.anchor.set(0.5)
		this.display = text
		sprite.addChild(this.display)
		return sprite
	}
}

export default Healthbar
