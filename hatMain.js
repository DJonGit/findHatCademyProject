const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field=[[]]){
        this._field = field;
        this._moveX = 0;
        this._moveY = 0;
        
    }

    play() {    
        while (this.inside()){
            if (this._field[this._moveY][this._moveX]=== hat){
                console.log('You won. Go have an ice cream!');
                break;
            } else if (this._field[this._moveY][this._moveX] == hole){
                console.log('Oh no! Hole!');
                break;
            }             
            this._field[this._moveY][this._moveX] = pathCharacter;
            this.print();      
            this.input();
        }   
        if (this.inside()=== false) {
            console.log('Outside. No lemon, please!')
        }    
    }
/* this method takes input from player and sets location for player path*/
    input() {
        let userInput = prompt('Your move U, D, L, R: ').toUpperCase();
        if (userInput === 'U'){       
            this._moveY -=1;      
        } else if (userInput ==='D') {
            this._moveY +=1;
        }else if (userInput ==='L') {
            this._moveX -=1;
        }else if (userInput ==='R') {
            this._moveX +=1;
        } else {
            console.log('Plese enter valid command.');
            this.input();
        }
    }
/* this method confirms that player is inside playing field. It is called twice when player is outside of the field*/
    inside() {         
        if(this._moveY <= this._field.length-1 && 
            this._moveY>=0 && 
            this._moveX<= this._field[0].length-1 && 
            this._moveX >=0)
            {
                return  true;    
            } else {
                return false;
            }
    }
/* this method converts field into string and prints*/
    print() {
            let joined = this._field.join("\n");
            console.log(joined.replace(/,/g,"")) ;
    }
/* this method creates gaming field */
    static createField(width, height, difficulty) {   
        const filler = [fieldCharacter, hole]
        let field = [];   
        for (let i=0; i< height; i++) {          
                let line = [];           
                for(let k =0; k< width;k++){
                    let filerIndex = Math.floor(Math.random()*filler.length*difficulty);
                    line.push(filler[filerIndex]);               
                }            
                field[i]= line;           
                field[0][0] = pathCharacter;     
        }
        let x = Math.floor(Math.random()*width);
        let y = Math.floor(Math.random()*height);
        while (x === 0 && y === 0) {
            x = Math.floor(Math.random()*width);
            y = Math.floor(Math.random()*height);
        }
        field[y][x] = hat;
        return field;
    }
}

const playA = new Field(Field.createField(15, 5, .57));
playA.play();