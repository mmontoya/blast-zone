import { Howl, Howler } from 'howler'

class SoundManager {
	public sounds: { explosion: Howl; bg_music: Howl }
	constructor() {
		this.initSounds()
	}

	initSounds() {
		let explosion = new Howl({
			src: ['sounds/explosion.mp3'],
		})

		let bg_music = new Howl({
			src: ['sounds/bg_music.mp3'],
			loop: true,
		})

		this.sounds = { explosion: explosion, bg_music: bg_music }
	}
}

export default SoundManager
