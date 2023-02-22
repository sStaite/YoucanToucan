import Phaser from 'phaser';

export default class MarkovScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {    
        
        this.load.image('textbox', require('../assets/Textbox.png'));
        this.load.image('number_wrong', require('../assets/number_background_wrong.png'));
        this.load.image('number_correct', require('../assets/number_background_correct.png'));
        this.load.image('number', require('../assets/number_background.png'));
        this.load.image('toucan', require('../assets/toucan.png'));


        this.load.spritesheet('numberbutton', require('../assets/Number_Button.png'), { frameWidth: 96, frameHeight: 120 });

        this.markov_array = new Array(4);
        this.initialise_markov_array();

        this.user_nums = new Array();
        this.comp_nums = new Array();

        this.width = 1440;
        this.height = 900;

    }

    create() {

        this.add.image(this.width - 100, this.height - 100, 'toucan').setScale(0.75);

        this.add.image(this.width/2, 0, 'textbox').setOrigin(0.5).setScale(0.5);

        this.create_number_button(this, 0);
        this.create_number_button(this, 1);

        this.add.text(this.width/2, 85/2, 'level 1',
            {fontSize: "64px", fontStyle: "bold", fontFamily: 'Andale Mono', color: '#0F0D15', align: 'center'})
            .setOrigin(0.5);

        this.win_percent = this.add.text(this.width/2 - 100, this.height/2 + 72, 
            " ", 
            {fontSize: "56px", fontFamily: 'Andale Mono', color: '#0F0D15', align: 'center'}).
        setOrigin(0.5);

        this.wins = this.add.text(this.width/2 + 72, this.height/2 + 16, 
            " ", 
            {fontSize: "56px", fontFamily: 'Andale Mono', color: '#0F0D15', align: 'center'}).
        setOrigin(0.5);

        this.total = this.add.text(this.width/2 + 72, this.height/2 + 128, 
            " ", 
            {fontSize: "56px", fontFamily: 'Andale Mono', color: '#0F0D15', align: 'center'}).
        setOrigin(0.5);
    }   

    update () {
        if (this.user_nums.length === 25) {
            console.log('finished!')
        }
    }

    /**************************************************************************************/
    /** DISPLAY CREATION **/

    create_number_button(scene, number) {
        let q;
        if (number === 0) {
            q = 3;
        } else if (number === 1){
            q = 3/2;
        }

        let button = this.add.sprite(this.width/q, this.height/4, 'numberbutton', 0).setInteractive();
        let buttonText = this.add.text(this.width/q, this.height/4- 12, number, 
            {fontSize: "56px", fontFamily: 'Andale Mono', color: '#644c25', align: 'center'})
            .setOrigin(0.5);

        button.on('pointerover', function () {
            this.setFrame(0);
            buttonText.y = scene.height/4 - 12;

        });
        button.on('pointerdown', function () {
            this.setFrame(1);
            buttonText.y += 6;

            this.setFrame(2);
            buttonText.y += 6;
        });
        button.on('pointerup', function () {
            this.setFrame(0);
            buttonText.y = scene.height/4 - 12;

            scene.make_guess();
            scene.update_markov_array();

            scene.user_nums.push(number);

            scene.update_user_group();
            scene.update_comp_group();

            scene.update_win_percentage();

        });
        button.on('pointerout', function () {
            this.setFrame(0);
            buttonText.y = scene.height/4 - 12;  
        });  
    };


    update_user_group() {
        let curr_len = this.user_nums.length;


        if (this.user_nums[curr_len-1] === this.comp_nums[curr_len-1]) {
            let img = this.add.image(this.width/26 * (curr_len), this.height/2 - 72, 'number_wrong').setOrigin(0.5);
            img.scale = 0.40
            let num = this.add.text(this.width/26 * curr_len, this.height/2 - 72, this.user_nums[curr_len-1], 
            {fontSize: "30px", fontFamily: 'Andale Mono', color: '#d46742', align: 'center'})
            .setOrigin(0.5);
        } else {
            let img = this.add.image(this.width/26 * (curr_len), this.height/2 - 72, 'number_correct').setOrigin(0.5);
            img.scale = 0.50
            let num = this.add.text(this.width/26 * curr_len, this.height/2 - 72, this.user_nums[curr_len-1], 
            {fontSize: "30px", fontFamily: 'Andale Mono', color: '#416356', align: 'center'})
            .setOrigin(0.5);
        }

    }

    update_comp_group() {
        let curr_len = this.comp_nums.length;
        let img = this.add.image(this.width/26 * curr_len, this.height/2 + 216, 'number').setOrigin(0.5);
        img.scale = 0.5;
        let num = this.add.text(this.width/26 * curr_len, this.height/2 + 216, this.comp_nums[curr_len-1], 
            {fontSize: "30px", fontFamily: 'Andale Mono', color: '#644c25', align: 'center'})
            .setOrigin(0.5);
    }

    update_win_percentage() {
        // this needs its own pixel art 
        let win = 0;

        for (let i = 0; i < this.user_nums.length; i++) {
            if (this.user_nums[i] != this.comp_nums[i]) {
                win++;
            }
        }

        this.win_percent.text = (win * 100 / this.user_nums.length).toFixed(1).toString() + "%";
        this.wins.text = win;
        this.total.text = this.user_nums.length;
    }


    /**************************************************************************************/
    /** GAME LOGIC **/

    initialise_markov_array () {
        for (let i = 0; i < this.markov_array.length; i++) {
                this.markov_array[i] = new Array(4).fill(0);
        }

        this.markov_array[0][0] = 1;
        this.markov_array[1][0] = 1;
        this.markov_array[2][2] = 1;
        this.markov_array[3][2] = 1; 
    };


    wipe_coefficients () {
        for (let i = 0; i < this.markov_array.length; i++) {
                this.markov_array[i] = new Array(4).fill(0);
        }
    };

    normalise_markov_array () {
        let total;
        for(let i = 0; i < 4; i++) {
            total = 0;
            for(let j = 0; j < 4; j++) {
                total += this.markov_array[i][j];
            }
            for(let j = 0; j < 4; j++) {
                this.markov_array[i][j] = this.markov_array[i][j] / total;
            }
        }
    };

    update_markov_array() {
        // Pass if we only have 2 datapoints
        if (this.comp_nums.length <= 2) {
            return;
        }
        // Wipe the markov array
        this.wipe_coefficients();
        let index, outcome;
        for(let i = 0; i < this.user_nums.length - 2; i++) {
            index = this.get_index(i, i + 1, this.user_nums);
            outcome = this.get_index(i + 1, i + 2, this.user_nums);
            this.markov_array[index][outcome] = this.markov_array[index][outcome] + 1;
        }
        this.normalise_markov_array();
    };

    make_guess() {
        // Add a random number and return if there are 2 numbers on the board
        if (this.user_nums.length <= 2) {
            this.comp_nums.push(Math.round(Math.random())); 
            return;
        }

        // Get index for row of markov array we are using
        let index = this.get_index(this.user_nums.length - 2, this.user_nums.length - 1, this.user_nums);

        // Find the highest probability for where the markov chain will go next
        let guess_index = this.markov_array[index].indexOf(Math.max(...this.markov_array[index]));

        if (guess_index == 0 || guess_index == 1) {
            this.comp_nums.push(0);
        } else {
            this.comp_nums.push(1);
        }    
    };

    get_index(first_num, second_num, array) {   
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

    };

    get_win_percent() {   
        player_wins = 0
        for(let i = 0; i < this.user_nums.length; i++) {
            if (this.user_nums[i] != this.comp_nums[i]) {
                player_wins++;
            }
        }
        return (player_wins * 100 / this.user_nums.length).toFixed(1) + '%'; 
    };

    /**************************************************************************************/

}








