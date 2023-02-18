import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
    backgroundColor: '#3b5258',
};

let game = new Phaser.Game(config); 
game.scene.add('MenuScene', MenuScene);
game.scene.add('GameScene', GameScene);
game.scene.start('MenuScene');

