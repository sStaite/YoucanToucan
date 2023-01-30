
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#4478aa',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var markov_array = new Array(4)
for (let i = 0; i < markov_array.length; i++) {
        markov_array[i] = new Array(4)
}

const user_nums = new Array()
const comp_nums = new Array()

function preload ()
{
    this.load.image('zero', 'images/zero.png');
    this.load.image('one', 'images/one.png');
}

function create ()
{
    var zero_sprite = this.add.sprite(40, 100, 'zero').setInteractive();
    var one_sprite = this.add.sprite(40, 40, 'one').setInteractive();

    zero_sprite.on('pointerdown', function (pointer) {
        user_nums.push(0);
        // some sort of markov array update here
    });

    one_sprite.on('pointerdown', function (pointer) {
        user_nums.push(1);
    });
}

function update ()
{   
    console.log(user_nums);
}