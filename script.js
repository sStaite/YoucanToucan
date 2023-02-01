/**************************************************************************************/

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

/**************************************************************************************/

var game = new Phaser.Game(config);
var markov_array = new Array(4)

const user_nums = new Array()
const comp_nums = new Array()

/**************************************************************************************/

function preload ()
{
    this.load.image('zero', 'assets/zero.png');
    this.load.image('one', 'assets/one.png');
    initialise_markov_array();
    change_coefficients(1, 1, 1, 1);
}

function create ()
{
    var zero_sprite = this.add.sprite(40, 100, 'zero').setInteractive();
    var one_sprite = this.add.sprite(40, 40, 'one').setInteractive();

    var user_text = this.add.text(100, 60, '_', { 
        fontFamily: 'andale mono', 
        fontSize: '20px'
    });

    var comp_text = this.add.text(100, 160, '_', { 
        fontFamily: 'andale mono', 
        fontSize: '20px'
    });

    var player_win_percent = this.add.text(700, 60, '_', { 
        fontFamily: 'andale mono', 
        fontSize: '20px'
    });

    zero_sprite.on('pointerdown', function (pointer) {
        // some sort of markov array update here
        make_guess();
        update_markov_array();

        // add 0 to user array
        user_nums.push(0);

        // update the text on screen
        user_text.setText(user_nums.toString());
        comp_text.setText(comp_nums.toString());
        player_win_percent.setText(get_win_percent())

    });

    one_sprite.on('pointerdown', function (pointer) {
        // some sort of markov array update here
        make_guess();
        update_markov_array();

        // add 1 to user array
        user_nums.push(1);

        // update the text on screen
        user_text.setText(user_nums.toString());
        comp_text.setText(comp_nums.toString());
        player_win_percent.setText(get_win_percent())

    });
}

function update ()
{   
    //console.log(user_nums);
}

/**************************************************************************************/

function initialise_markov_array () 
{
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
    // Add a random number and return if there are less than 2 numbers.
    if (user_nums.length <= 2) {
        comp_nums.push(Math.round(Math.random())); 
        return;
    }

    // Get index for row of markov array we are using
    let index;

    if (user_nums[user_nums.length - 1] == 0) { // last digit is 0
        if (user_nums[user_nums.length - 2] == 0) { // last two digits are: 00
            index = 0;
        } else {                                    // last two digits are: 10
            index = 1;
        }
    } else {
        if (user_nums[user_nums.length - 2] == 0) { // last two digits are: 01
            index = 2;
        } else {                                    // last two digits are: 11
            index = 3;
        }
    }

    // Find the highest probability for where the markov chain will go next
    let guess_index = markov_array[index].indexOf(Math.max(...markov_array[index]));
    console.log(markov_array[index])

    if (guess_index == 0 || guess_index == 1) {
        comp_nums.push(0);
    } else {
        comp_nums.push(1);
    }


        
}

function get_win_percent()
{   
    player_wins = 0
    for(let i = 0; i < user_nums.length; i++) {
        if (user_nums[i] != comp_nums[i]) {
            player_wins++;
        }
    }
    return (player_wins * 100 / user_nums.length) + '%'; 
}

/**************************************************************************************/






