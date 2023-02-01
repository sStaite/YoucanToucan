
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

const user_nums = new Array()
const comp_nums = new Array()

function preload ()
{
    this.load.image('zero', 'images/zero.png');
    this.load.image('one', 'images/one.png');
    initialise_markov_array();
    change_coefficients(1, 1, 1, 1);
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
        // some sort of markov array update here
    });
}

function update ()
{   
    console.log(user_nums);
}

function initialise_markov_array () 
{
    var markov_array = new Array(4)
    for (let i = 0; i < markov_array.length; i++) {
            markov_array[i] = new Array(4).fill(0);
    }
}


function change_coefficients (w, x, y, z) 
{
    markov_array[0][0] = w;
    markov_array[0][2] = 1 - w;
    markov_array[1][0] = x;
    markov_array[1][2] = 1 - x;
    markov_array[2][1] = 1 - y; 
    markov_array[2][3] = y;
    markov_array[3][1] = 1 - z;
    markov_array[3][3] = z;
}


function update_markov_array()
{

}

function make_guess()
{
    // this only works when user_nums has two numbers in it
    if (user_nums.length < 2) {
        comp_nums[user_nums.length - 1] = Math.random(0, 1); // look up how this works
    }

    // Get last two digits
    if (user_nums[user_nums.length - 1] = 0)
    user_nums.length
}




