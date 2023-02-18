import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super();
    };


    preload() {

        this.load.spritesheet('startbox', require('../assets/Start_Textbox.png'), { frameWidth: 327, frameHeight: 200 });
        this.load.image('textbox', require('../assets/Textbox.png'));


    };

    create() {

        // Start button
        var start_button = this.add.sprite(600, 600, 'startbox', 0).setInteractive();

        // Opening text box
        var opening_text = "You pick 1 or 0, I pick 1 or 0. You get a point if I don't select your number. Easy, right?"

        var textbox = this.add.sprite(600, 250, 'textbox');
        var text = this.add.text(200, 100, opening_text, {fontSize: "24px", fontFamily: 'Andale Mono', color: '#644c25' });

        start_button.on('pointerover', function () {
            this.setFrame(0);
        });
        start_button.on('pointerdown', function () {
            this.setFrame(1);
            start_text.y -= 30;
        });
        start_button.on('pointerup', function () {
            this.setFrame(0);
            this.scene.scene.start('GameScene');
        });
        start_button.on('pointerout', function () {
            this.setFrame(0);
        });  

    };

    update() {

    }

};
