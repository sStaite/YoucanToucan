import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene.js';
import MarkovScene from './scenes/MarkovScene.js';

let config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 900,
    scale: {
        mode: Phaser.Scale.FIT
    },
    backgroundColor: '#3b5258',
};

let game = new Phaser.Game(config); 
game.scene.add('MenuScene', MenuScene);
game.scene.add('MarkovScene', MarkovScene);
game.scene.start('MenuScene');

