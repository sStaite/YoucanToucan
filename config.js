
var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
    parent: 'game-container',
    backgroundColor: '#3b5258',
    scene: [ PreloadScene, MenuScene, GameScene ]
};

export default config;