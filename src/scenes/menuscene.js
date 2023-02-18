import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    };


    preload() {

        this.load.spritesheet('startbox', './src/assets/Start_Textbox.png', { frameWidth: 327, frameHeight: 200 });
    };


    create() {

        var hi = 2;

        // Start button
        const start_button = this.add.sprite(600, 450, 'startbox', 0).setInteractive();

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


    };

};
