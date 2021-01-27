class MovementManager {
	public keys: any
	public speed: number

	constructor() {
		this.keys = {}
		this.speed = 5
		this.listenForKeyEvents()
	}

	bindToKeys(character) {
		if (!character.isDead) {
			// W & arrow UP
			if (this.keys['87'] || this.keys['38']) {
				if (!character.sprite.playing) {
					character.sprite.textures =
						character.spriteSheet.animations['walkNorth']
					character.sprite.play()
				}
				character.charContainer.y -= this.speed
			}
			// S & Arrow  RIGHT
			if (this.keys['83'] || this.keys['40']) {
				if (!character.sprite.playing) {
					character.sprite.textures =
						character.spriteSheet.animations['walkSouth']
					character.sprite.play()
				}
				character.charContainer.y += this.speed
			}
			// A & Arrow LEFT
			if (this.keys['65'] || this.keys['37']) {
				if (!character.sprite.playing) {
					character.sprite.textures =
						character.spriteSheet.animations['walkWest']
					character.sprite.play()
				}
				character.charContainer.x -= this.speed
			}
			// D & Arrow RIGHT
			if (this.keys['68'] || this.keys['39']) {
				if (!character.sprite.playing) {
					character.sprite.textures =
						character.spriteSheet.animations['walkEast']
					character.sprite.play()
				}
				character.charContainer.x += this.speed
			}
		} else {
			character.sprite.textures = character.spriteSheet.animations['dead']
			character.sprite.play()
		}
	}

	listenForKeyEvents() {
		window.addEventListener('keydown', this.onKeysDown.bind(this))
		window.addEventListener('keyup', this.onKeysUp.bind(this))
	}

	onKeysDown(e) {
		//console.log(this.keys)
		this.keys[e.keyCode] = true
	}

	onKeysUp(e) {
		//console.log(this.keys)
		this.keys[e.keyCode] = false
	}
}

export default MovementManager
