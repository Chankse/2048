import {Board} from "./board.js"


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')

let board = new Board(ctx);
board.drowGrid();


document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
    let key = event.key != ' ' ? event.key : event.code;
    switch(key){
        case 'ArrowLeft':
            board.onArrowLeft();
            break;
        case 'ArrowRight': 
            board.onArrowRight();
            break;
        case 'ArrowUp':
            board.onArrowUp();
            break;
        case 'ArrowDown':
            board.onArrowDown();
            break;
    }
}



