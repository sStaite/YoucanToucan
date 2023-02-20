import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super();
    };


    preload() {

        this.load.spritesheet('startbox', require('../assets/Start_Textbox.png'), { frameWidth: 327, frameHeight: 200 });
        this.load.image('textbox', require('../assets/Textbox.png'));
        this.canvas = this.sys.game.canvas;
        this.width = 1440;
        this.height = 900;

    };

    create() {
        this.create_start_button();
        this.create_opening_text();
    };

    create_start_button() {
        let start_button = this.add.sprite(this.width/2, this.height*3/4, 'startbox', 0).setInteractive();

        start_button.on('pointerover', function () {
            this.setFrame(0);
        });
        start_button.on('pointerdown', function () {
            this.setFrame(1);
        });
        start_button.on('pointerup', function () {
            this.setFrame(0);
            this.scene.scene.start('MarkovScene');
        });
        start_button.on('pointerout', function () {
            this.setFrame(0);
        });  
    };

    create_opening_text() {
        let opening_text = "You pick 1 or 0, I pick 1 or 0\n\nWe Reveal\n\nYou get a point if I don't select your number\n\n Easy, right?"
        let textbox = this.add.sprite(this.width/2, this.height/3, 'textbox');
        let text = this.add.text(this.width/2, this.height/3, opening_text, {fontSize: "30px", fontFamily: 'Andale Mono', color: '#644c25', align: 'center'})
            .setOrigin(0.5);
    };

};
