export class Board {
    constructor(ctx){
        this.ctx = ctx;
        this.grid = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]

        this.squareWidth = 100;

        this.generateRandomNumber();
        this.generateRandomNumber();
    }


    drowGrid(){
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                this.drowSquare(i, j);
            }
        }
    }
    
    
    drowSquare(x,y,color) {
        this.ctx.fillStyle = color? color : 'white';
        this.ctx.fillRect(x*this.squareWidth, y*this.squareWidth, this.squareWidth, this.squareWidth);
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(x*this.squareWidth, y*this.squareWidth, this.squareWidth, this.squareWidth);
        if(this.grid[y][x] == 0) {
            return;
        }
        this.ctx.fillStyle = 'black';
        this.ctx.font = "24px Arial";
        this.ctx.fillText(this.grid[y][x], x*this.squareWidth + this.squareWidth/3, y*this.squareWidth+ this.squareWidth/2);
    }
    
    
    slideRow(arr){
        arr = arr.filter(a=>a);
        let zeros = Array(4-arr.length).fill(0)
        arr = zeros.concat(arr);
    
    
        if(arr[3] == arr[2]){
            arr[3] *= 2;
            arr[2] = 0;
        }
        if(arr[2] == arr[1]){
            arr[2] *= 2;
            arr[1] = 0;
        }
        if(arr[1] == arr[0]){
            arr[1] *= 2;
            arr[0] = 0;
        }
    
        arr = arr.filter(a=>a);
        zeros = Array(4-arr.length).fill(0)
        arr = zeros.concat(arr);
    
        return arr;
    }

    slideRowReversed(arr){
        arr = arr.filter(a=>a);
        let zeros = Array(4-arr.length).fill(0)
        arr = arr.concat(zeros);

        if(arr[0] == arr[1]){
            arr[0] *= 2;
            arr[1] = 0;
        }
        if(arr[1] == arr[2]){
            arr[1] *= 2;
            arr[2] = 0;
        }
        if(arr[2] == arr[3]){
            arr[2] *= 2;
            arr[3] = 0;
        }
        arr = arr.filter(a=>a);
        zeros = Array(4-arr.length).fill(0)
        arr = arr.concat(zeros);

        return arr;
    }
    
    
    generateRandomNumber() {
        let emptySpaces = [];
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                if(this.grid[i][j] == 0){
                    emptySpaces.push({x:i, y:j})
                }
            }
        }
    
        if(emptySpaces.length != 0){
            let r = Math.floor(Math.random()*emptySpaces.length);
            let el = emptySpaces[r];
            this.grid[el.x][el.y] = 2;
        }
    }

    onArrowRight(){
        let newGrid = [];
        for(let i =0; i< this.grid.length; i++){
            newGrid[i] = this.slideRow(this.grid[i]);
        }
        if(JSON.stringify(newGrid) != JSON.stringify(this.grid)){
            this.grid = newGrid;
            this.generateRandomNumber();
            this.drowGrid();
        }
    }

    onArrowLeft(){
        let newGrid = [];
        for(let i =0; i< this.grid.length; i++){
            newGrid[i] = this.slideRowReversed(this.grid[i]);
        }
        if(JSON.stringify(newGrid) != JSON.stringify(this.grid)){
            this.grid = newGrid;
            this.generateRandomNumber();
            this.drowGrid();
        }
    }

    onArrowUp(){
        let transpose =  this.grid[0].map((col, c) => this.grid.map((row, r) => this.grid[r][c]));

        for(let i =0; i< transpose.length; i++){
            transpose[i] = this.slideRowReversed(transpose[i]);
        }

        transpose =  transpose[0].map((col, c) => transpose.map((row, r) => transpose[r][c]));

        if(JSON.stringify(transpose) != JSON.stringify(this.grid)){
            this.grid = transpose;
            this.generateRandomNumber();
            this.drowGrid();
        }
    }

    onArrowDown(){
        let transpose =  this.grid[0].map((col, c) => this.grid.map((row, r) => this.grid[r][c]));
        
        for(let i =0; i< transpose.length; i++){
            transpose[i] = this.slideRow(transpose[i]);
        }
        
        transpose =  transpose[0].map((col, c) => transpose.map((row, r) => transpose[r][c]));

        if(JSON.stringify(transpose) != JSON.stringify(this.grid)){
            this.grid = transpose;
            this.generateRandomNumber();
            this.drowGrid();
        }
    }
}