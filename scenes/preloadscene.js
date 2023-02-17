class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    this.load.spritesheet('start', 'assets/Start_Textbox.png', { frameWidth: 327, frameHeight: 200 });

  }

  create() {

    this.scene.start('MenuScene');
    
  }
}
