let buttons = document.querySelectorAll('button');
let human1 = document.getElementById('human1');
let ai1 = document.getElementById('ai1');
let human2 = document.getElementById('human2');
let ai2 = document.getElementById('ai2');
let menu = document.getElementsByClassName('menu')[0];
let board = document.getElementsByClassName('board')[0];
let p1WinMenu = document.getElementsByClassName('player1WinMenu')[0];
let p2WinMenu = document.getElementsByClassName('player2WinMenu')[0];

buttons.forEach(button => {
    button.addEventListener('click',(e)=>markPlayers(e,button));
});

function markPlayers(e,button){
    buttonId = e.target.id;
    
    if(buttonId == 'startButton'){
        Game.start();
    }else{
        Game.setPlayers(buttonId);
        button.setAttribute('style','background-color:black; color:white;');
    }

    if(buttonId == 'human1'){
        ai1.setAttribute('style','background-color:buttonface; color:black;');
    }else if(buttonId == 'ai1'){
        human1.setAttribute('style','background-color:buttonface; color:black;');
    }else if(buttonId == 'human2'){
        ai2.setAttribute('style','background-color:buttonface; color:black;');
    }else if(buttonId == 'ai2'){
        human2.setAttribute('style','background-color:buttonface; color:black;');
    }
}

let Game = (function(){
    let _players = [];
    let _tiles = ['','','','','','','','',''];
    let winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let _turn = 1;
    let hasWinner = false;


    let setPlayers = function(player){
        if(_players.includes(player)){
        }else{
            (player == 'human1' || player == 'ai1') ? _players[0] = player : _players[1] = player;
        }
    }

    let _setBoard = function(){
        for(let i=0;i<9;i++){
            let div = document.createElement('div');
            div.classList.add('tile');
            div.setAttribute('id',i);
            board.appendChild(div);
        }
        menu.setAttribute('style','display:none;');
        board.setAttribute('style','display:flex;');
    }

    let _checkWinner = function(){
        for(let i=0;i<winningCombinations.length;i++){
            let p1 = 0;
            let p2 = 0;
            for(let j =0;j<3;j++){
                let winCheck = winningCombinations[i][j];
                (_tiles[winCheck] == 'x')? p1 += 1 : (_tiles[winCheck] == 'o') ? p2 += 1 : console.log('none');
                if(p1 == 3){
                    board.setAttribute('style','display:none');
                    p1WinMenu.setAttribute('style','display: flex');
                    console.log(`Player 1: ${p1}`);
                    hasWinner = true;
                }else if(p2 == 3){
                    board.setAttribute('style','display:none');
                    p2WinMenu.setAttribute('style','display: flex');
                    console.log(`Player 2: ${p2}`);
                    hasWinner = true;
                }
            }
        }
        
    }

    let _aimove = function(){
        let _availableTiles = [];
        for(let i=0;i<_tiles.length;i++){
            if(_tiles[i] == ''){
                _availableTiles.push(i);
            }
        }
        randomNum = _availableTiles[Math.floor(Math.random() * _availableTiles.length)];
        let tileSelected = document.getElementById(randomNum);
        if(!(_turn % 2 == 0)){
            _tiles[randomNum] = 'x';
            tileSelected.innerHTML = 'x'; 
        }else{
            _tiles[randomNum] = 'o';
            tileSelected.innerHTML = 'o'; 
        }
        _turn += 1;
    }

    let _currentPlayerMark = function(e){
        let tileId = e.target.id;
        if(e.target.innerHTML.length == 0){
            if(!(_turn % 2 == 0)){
                e.target.innerHTML = 'x';
                _tiles[tileId] = 'x';
            }else{
                e.target.innerHTML = 'o';
                _tiles[tileId] = 'o';
            }
            _turn += 1;
            if(_players[0] == 'ai1' || _players[1] == 'ai2'){
                _aimove();
            }
            _checkWinner();
            
        }
    }

    let _setTilesListener = function(){
        let tiles = document.getElementsByClassName('tile');
        let tilesArr = Array.from(tiles);
        tilesArr.forEach(tile => {
            tile.addEventListener('click',(e) => _currentPlayerMark(e));
        });  
    }

    let start = function(){
        if(_players.length == 2){
            _setBoard();
            _setTilesListener();
            if(_players[0] == 'ai1' && _players[1] == 'ai2'){
                for(let i=0;i<9;i++){
                    _aimove();
                    _checkWinner();
                    if(hasWinner){
                        break;
                    }
                }
            }else{
                if(_players[0] == 'ai1'){
                _aimove();
            }
            }
        }
    }

    return{
        setPlayers : setPlayers,
        start: start,
    }

})();
