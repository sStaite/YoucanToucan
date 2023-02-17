import Phaser from './node_modules/phaser';
import config from './config.js';
import PreloadScene from './scenes/PreloadScene.js';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('PreloadScene', PreloadScene);
    this.scene.add('MenuScene', MenuScene);
    this.scene.add('GameScene', GameScene);
    this.scene.start('PreloadScene');
  }
}

window.onload = function () {
  window.game = new Game();
};