const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(field = [[]]){
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter;
    };
    runGame(){
        let playing = true;
        while(playing){
            this.print();
            this.promptUser();
        if(!this.isInBounds()){
            playing = false;
            console.log('Out of bounds!');
            break;
        } else if (this.isHole() === true){
            playing = false;
            console.log('You fell down a hole!');
            break;
        } else if (this.isHat() === true){
            playing = false;
            console.log('Congrats! You found your hat!');
            break;
        } 
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    promptUser(){
        let movement = prompt('Make your move: u,d,l,r');
        switch (movement){
            case 'u':
                this.locationY -= 1;
                break;
            case 'd':
                this.locationY += 1;
              break;
            case 'l':
                this.locationX -= 1;
                break;
            case 'r':
                this.locationX += 1;
                break;
            default:
                console.log('Invalid input. Selection must be u, d, l, or r.');
                this.promptUser();
        }
    }
    isInBounds(){
        
        return(this.locationX >=0 &&
            this.locationY >= 0 &&
            this.locationX < this.field[0].length &&
            this.locationY < this.field.length)
    }
    isHole(){
        return(this.field[this.locationY][this.locationX]=== hole)
    }
    isHat(){
        return(this.field[this.locationY][this.locationX]=== hat)
    }
    print(){
        const displayString = this.field.map(row => {
            return row.join('');
          }).join('\n');
        console.log(displayString);
    }
    static generateField(height, width, percentage = .1){
        const fieldOutput = new Array(height).fill(0).map(el => new Array(width));
        for(let y = 0; y<height; y++){
            for(let x= 0; x<width; x++){
                const prob = Math.random();
                // console.log(prob);
                // console.log(percentage);
                fieldOutput[y][x] = prob > percentage ? fieldCharacter : hole;
                // console.log('field being constructed')
            }
        }

        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        }

        while(hatLocation.x === 0 && hatLocation.y === 0){
            hatLocation.x =  Math.floor(Math.random * width);
            hatLocation.y =  Math.floor(Math.random * height);
        }

        fieldOutput[hatLocation.x][hatLocation.y] = hat;
        return fieldOutput;
    }
}

//Tests
const myField = new Field(Field.generateField(10,10,.1))
myField.runGame();
