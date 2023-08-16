let buttons = document.querySelectorAll('button');
let human1 = document.getElementById('human1');
let ai1 = document.getElementById('ai1');
let human2 = document.getElementById('human2');
let ai2 = document.getElementById('ai2');

buttons.forEach(button => {
    button.addEventListener('click',(e)=>markPlayers(e,button));
});

function markPlayers(e,button){
    buttonId = e.target.id;
    button.setAttribute('style','background-color:black; color:white;');
    if(buttonId == 'human1'){
        Game.setPlayers(buttonId);
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

    let setPlayers = function(player){
        if(_players.includes(player)){
        }else{
            _players.push(player);
        }
    }

    return{
        setPlayers : setPlayers,
    }

})();