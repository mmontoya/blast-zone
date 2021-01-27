import * as PIXI from 'pixi.js';

class Scorch {
	public app: PIXI.Application;
	public resourceName: string;
	public sprite: PIXI.Sprite;

	constructor(app: PIXI.Application, resourceName: string) {
		this.app = app;
		this.resourceName = resourceName;
		this.sprite = this.createSprite();
	}

	createSprite(): PIXI.Sprite {
		const scorchTexture = this.app.loader.resources[this.resourceName].texture;
		let scorchSprite = new PIXI.Sprite(scorchTexture);
		scorchSprite.anchor.set(0.5);
		scorchSprite.scale.set(0.28);
		scorchSprite.blendMode = PIXI.BLEND_MODES.COLOR_BURN;
		scorchSprite.alpha = 0.75;
		return scorchSprite;
	}
}

export default Scorch;
