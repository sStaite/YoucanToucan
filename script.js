
/**************************************************************************************/

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
    backgroundColor: '#3b5258',
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
    this.load.spritesheet('start', 'assets/Start_Textbox.png', { frameWidth: 327, frameHeight: 200 });

    initialise_markov_array();
    gameState = 0;
}

function create ()
{
    // Start button
    var start_button = this.add.sprite(600, 450, 'start', 0).setInteractive();

    start_button.on('pointerover', function () {
        this.setFrame(0);
    });
    start_button.on('pointerdown', function () {
        this.setFrame(1);
    });
    start_button.on('pointerup', function () {
        this.setFrame(0);
        gameState = 1;
    });
    start_button.on('pointerout', function () {
        this.setFrame(0);
    });


    // Buttons for zero and one

    /*
    // Zero image logic
    zero_sprite.on('pointerdown', function (pointer) {
        zero_sprite.setTexture('zero');
        zero_sprite.setTint(Phaser.Display.Color.GetColor(120, 120, 120));

        make_guess();
        update_markov_array();

        // add 0 to user array
        user_nums.push(0);

        // update the text on screen
        user_text.setText(user_nums.toString());
        comp_text.setText(comp_nums.toString());
        user_guesses.setText(user_nums.length);
        player_win_percent.setText(get_win_percent())
    });

    zero_sprite.on('pointerup', function (pointer) {
        zero_sprite.setTexture('zero_hover');
        zero_sprite.clearTint();
    });

    zero_sprite.on('pointerover', function (pointer) {
        zero_sprite.setTexture('zero_hover');
    });

    zero_sprite.on('pointerout', function (pointer) {
        zero_sprite.setTexture('zero');
    });


    // One image logic
    one_sprite.on('pointerdown', function (pointer) {
        one_sprite.setTexture('one');
        one_sprite.setTint(Phaser.Display.Color.GetColor(120, 120, 120));

        make_guess();
        update_markov_array();

        // add 1 to user array
        user_nums.push(1);

        // update the text on screen
        user_text.setText(user_nums.toString());
        comp_text.setText(comp_nums.toString());
        user_guesses.setText(user_nums.length); 
        player_win_percent.setText(get_win_percent());
    });

    one_sprite.on('pointerup', function (pointer) {
        one_sprite.setTexture('one_hover');
        one_sprite.clearTint();
    });

    one_sprite.on('pointerover', function (pointer) {
        one_sprite.setTexture('one_hover');
    });

    one_sprite.on('pointerout', function (pointer) {
        one_sprite.setTexture('one');
    });
    */
}

function update ()
{   

}

/**************************************************************************************/
/**                      FUNCTIONS THAT CONTROL EACH GAMESTATE                       **/

function gameStateZero() {
    start_button.visible = true;
}

function gameStateOne() {
    start_button.visible = false;
}






/**************************************************************************************/


function initialise_markov_array () 
{
    for (let i = 0; i < markov_array.length; i++) {
            markov_array[i] = new Array(4).fill(0);
    }

    markov_array[0][0] = 1;
    markov_array[1][0] = 1;
    markov_array[2][2] = 1;
    markov_array[3][2] = 1; 
}


function wipe_coefficients () 
{
    for (let i = 0; i < markov_array.length; i++) {
            markov_array[i] = new Array(4).fill(0);
    }
}

function normalise_markov_array () {
    let total;
    for(let i = 0; i < 4; i++) {
        total = 0;
        for(let j = 0; j < 4; j++) {
            total += markov_array[i][j];
        }
        for(let j = 0; j < 4; j++) {
            markov_array[i][j] = markov_array[i][j] / total;
        }
    }
}

function update_markov_array()
{
    // Pass if we only have 2 datapoints
    if (comp_nums.length <= 2) {
        return;
    }
    // Wipe the markov array
    wipe_coefficients();
    let index, outcome;
    for(let i = 0; i < user_nums.length - 2; i++) {
        index = get_index(i, i + 1, user_nums);
        outcome = get_index(i + 1, i + 2, user_nums);
        markov_array[index][outcome] = markov_array[index][outcome] + 1;
    }
    normalise_markov_array();
}

function make_guess()
{
    // Add a random number and return if there are 2 numbers on the board
    if (user_nums.length <= 2) {
        comp_nums.push(Math.round(Math.random())); 
        return;
    }

    // Get index for row of markov array we are using
    let index = get_index(user_nums.length - 2, user_nums.length - 1, user_nums);

    // Find the highest probability for where the markov chain will go next
    let guess_index = markov_array[index].indexOf(Math.max(...markov_array[index]));

    if (guess_index == 0 || guess_index == 1) {
        comp_nums.push(0);
    } else {
        comp_nums.push(1);
    }    
}

function get_index(first_num, second_num, array)
{   
    let index;
    if (array[second_num] == 0) { // digit is 0
        if (array[first_num] == 0) { // two digits are: 00
            index = 0;
        } else {                                    // two digits are: 10
            index = 1;
        }
    } else {
        if (array[first_num] == 0) { // two digits are: 01
            index = 2;
        } else {                                    // two digits are: 11
            index = 3;
        }
    }

    return index;

}

function get_win_percent()
{   
    player_wins = 0
    for(let i = 0; i < user_nums.length; i++) {
        if (user_nums[i] != comp_nums[i]) {
            player_wins++;
        }
    }
    return (player_wins * 100 / user_nums.length).toFixed(1) + '%'; 
}

/**************************************************************************************/






