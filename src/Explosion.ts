import * as PIXI from 'pixi.js'

class Explosion {
	public app: PIXI.Application
	public resourceName: string
	public animation: PIXI.AnimatedSprite

	constructor(app: PIXI.Application, resourceName: string) {
		this.app = app
		this.resourceName = resourceName
		this.animation = this.createAnimatedSprite()
	}

	createAnimatedSprite(): PIXI.AnimatedSprite {
		const explosionSpriteSheet = this.app.loader.resources[this.resourceName]
			.spritesheet
		let animatedExplosion = new PIXI.AnimatedSprite(
			explosionSpriteSheet.animations['sprite_explosion']
		)
		animatedExplosion.animationSpeed = 0.5
		animatedExplosion.anchor.set(0.5)
		animatedExplosion.loop = false
		return animatedExplosion
	}
}

export default Explosion
