import Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
    constructor() {
        super();
    };


    preload() {

        this.load.spritesheet('startbox', require('../assets/Start_Textbox.png'), { frameWidth: 327, frameHeight: 200 });
    };


    create() {

        // Start button
        var start_button = this.add.sprite(600, 450, 'startbox', 0).setInteractive();

        start_button.on('pointerover', function () {
            this.setFrame(0);
        });
        start_button.on('pointerdown', function () {
            this.setFrame(1);
        });
        start_button.on('pointerup', function () {
            this.setFrame(0);
            this.scene.scene.start('GameScene');
        });
        start_button.on('pointerout', function () {
            this.setFrame(0);
        });  


    };

};

export default MenuScene;
