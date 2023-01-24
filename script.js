
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
	this.load.image('toucan', 'images/toucan.png')
}

function create ()
{
	this.add.image(400, 300, 'toucan');
}

function update ()
{
}