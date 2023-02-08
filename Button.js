class Button {
	constructor(scene, x, y, num, active, hover, clicked) {
		const button = scene.add.image(this.x, this.y, this.active)
						.setInteractive()
						.on('pointerdown', () => this.is_down())
						.on('pointerover', () => this.is_hovering())
						.on('pointerout', () => this.is_out());
		let this.num = num;
	}

	is_hovering() {
		button.setTexture('hover'); 
	}

	is_down() {
		button.setTexture('clicked');

	}

	is_out() {
		button.setTexture('active'); 
	}
}