class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  create() {

    // Start button
    var start_button = this.add.sprite(600, 450, 'start', 0).setInteractive();

    start_button.on('pointerover', function () {
        this.setFrame(0);
    });
    start_button.on('pointerdown', function () {
        this.setFrame(1);
    });
    start_button.on('pointerup', function () {
        this.setFrame(0);
        this.scene.start('GameScene');
    });
    start_button.on('pointerout', function () {
        this.setFrame(0);
    });  
  }

}
