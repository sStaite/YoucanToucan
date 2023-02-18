import Phaser from 'phaser';
import config from './config.js';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';

class Game extends Phaser.Game {
  constructor(config) {
    super(config);
    this.scene.add('MenuScene', MenuScene);
    this.scene.add('GameScene', GameScene);
    this.scene.start('MenuScene');
  };
};

var game = new Game(config); 
