/** The additional features are the moves counts and time alongside multiple backgroud..
would like to be marked for the time and move count.*/




var sessionStart = false;
var shuffleBtn, puzzlePiece, puzzleArea;
var puzlTop = 0, puzlLeft = 0, counter = 0, min = 0, sec = 0, move = 0, timer;


window.onload = function(){
    
    var timeKeeper = document.createElement("P");
    var moves = document.createElement("P");
    var gameSession = document.createElement("P");
    
    puzzleArea = document.getElementById("puzzlearea");
    
	moves.id = "moves";
    moves.appendChild(document.createTextNode("Moves: "));
    document.getElementById("overall").insertBefore(moves,puzzleArea);
    moves.style.position = "fixed";
    moves.style.top = "15%";
    moves.style.left = "1%";
	
	timeKeeper.id = "timeKeeper";
    timeKeeper.appendChild(document.createTextNode("Timer: 00:00"));
    document.getElementById("overall").insertBefore(timeKeeper,puzzleArea);
    timeKeeper.style.position = "fixed";
    timeKeeper.style.top = "13%";
    timeKeeper.style.left = "1%";
	
    gameSession.id = "gameSession";
    document.getElementById("overall").insertBefore(gameSession,puzzleArea);
    gameSession.style.position = "fixed";
    gameSession.style.top = "20%";
    gameSession.style.left = "1%";
    
	puzzlePiece = puzzleArea.getElementsByTagName("div");
	shuffleBtn = document.getElementById("shufflebutton");
	shuffleBtn.onclick = shuffle;
    var imgs =["background.jpg", "Image-2.jpg", "Image-3.jpg", "image-4.jpg"];
    alignGrid(imgs[counter]);
    moves.style.padding = "10px";
    btn();
}


function alignGrid(img){
    var i;
    for (i = 0; i < puzzlePiece.length; i++){
        puzzlePiece[i].className = "puzzlepiece";
        puzzlePiece[i].style.top = puzlTop + "px";
        puzzlePiece[i].style.left = puzlLeft + "px";
        puzzlePiece[i].webkitTransition = "all 1000ms ease";
        puzzlePiece[i].mozTransition = "all 1000ms ease";
        puzzlePiece[i].msTransition = "all 1000ms ease";
        puzzlePiece[i].oTransition = "all 1000ms ease";
        puzzlePiece[i].style.transition = "all 1000ms ease";
        puzzlePiece[i].style.backgroundImage =  "url('./img/"+img+"')";
        puzlLeft = puzlLeft + 100;
        if(puzlLeft > 300){
            puzlTop = puzlTop + 100;
            puzlLeft = 0;
        }
        puzzlePiece[i].style.backgroundPosition = "-" + puzzlePiece[i].style.left + " " + "-" + puzzlePiece[i].style.top;
        puzzlePiece[i].onmouseover = function(){
            if(tryMove(this.style.left, this.style.top)){
                this.classList.add("movablepiece");
                this.style.cursor = "pointer";
            }
        }
        puzzlePiece[i].onmouseout = function(){
            this.classList.remove("movablepiece");
            this.style.cursor = "context-menu";
        }
        puzzlePiece[i].onmousedown = function(){
            if(tryMove(this.style.left, this.style.top)){
                movesCounter();
                var lst = moveMent(this.style.left, this.style.top);
                this.style.left = lst[0];
                this.style.top = lst[1];
            }
        }
    }
    puzlTop = 300;
    puzlLeft = 300;
}



function tryMove(leftPx,topPx){
    var move = false;
    var x = parseInt(leftPx);
    var y = parseInt(topPx);
    if(x + 100 === puzlLeft  && y === puzlTop){
        move = true;   
    }
    else if(x - 100 === puzlLeft && y === puzlTop){
        move = true;
    }
    else if(y + 100 === puzlTop && x === puzlLeft){
        move = true;
    }
    else if (y - 100 === puzlTop && x === puzlLeft){
        move = true;
    }
    else {
        move = false;
    }
    return move;
}

function moveMent(leftPx, topPx){
    var temp = leftPx;
    leftPx = puzlLeft + "px";
    puzlLeft= parseInt(temp);
    temp = topPx;
    topPx = puzlTop +"px";
    puzlTop = parseInt(temp);
    return [leftPx, topPx];
}

function shuffle(){
    if(!sessionStart){
        timer = setInterval(timekeeper,1000);
        var i, l;
        var lst2 = [];
        for(let k = 0; k < 100; k++){
            for(i = 0; i < puzzlePiece.length; i++){
                if(tryMove(puzzlePiece[i].style.left, puzzlePiece[i].style.top)){
                    lst2.push([puzzlePiece[i],i]);
                }
            }
            if(lst2.length != 0){
                var ranNum = Math.floor(Math.random() * lst2.length);
                var lst = moveMent(lst2[ranNum][0].style.left, lst2[ranNum][0].style.top);
                lst2[ranNum][0].style.left = lst[0];
                lst2[ranNum][0].style.top = lst[1];
            }
            else{
                l--;
            }
            lst2 = [];
        }
        sessionStart = true;
    }
    else{
        
    }
}


function btn() {
    var controls = document.getElementById("controls");
    var nextBtn = document.createElement("BUTTON");
    var resetBtn = document.createElement("BUTTON");
    nextBtn.id = "next";
    resetBtn.id = "reset";
    nextBtn.appendChild(document.createTextNode("Next Image"));
    resetBtn.appendChild(document.createTextNode("Reset Game"));
    var btnList = [shuffleBtn, nextBtn, resetBtn];
    for(var i = 0; i < btnList.length; i++){
        btnList[i].style.fontFamily = "Verdana";
        btnList[i].style.color = "#9400D3";
        btnList[i].style.fontSize = "16px";
        btnList[i].style.background = "#00ffff";
        btnList[i].style.padding = "10px 20px";
        btnList[i].style.textDecoration = "none";
        btnList[i].style.border = "none";
        btnList[i].style.margin = "5px";
        btnList[i].style.cursor = "pointer";
        if(i != 3){
            controls.appendChild(btnList[i]);
        }
    }
    nextBtn.addEventListener("click", nextImg);
    resetBtn.addEventListener("click", resetGame);
}



function nextImg(){
    if(!sessionStart){
        puzlTop = 0;
        puzlLeft = 0;
        var imgs =["background.jpg", "Image-2.jpg", "Image-3.jpg", "image-4.jpg"];
        if(counter == 3){
            counter = 0;
        }
        else{
			counter++;
            
        }
		alignGrid(imgs[counter]);
    }
}

function movesCounter(){
    move++;
    document.getElementById("moves").innerHTML = "Moves: " + move;
}

function timekeeper(){
    var time;
    if(sec < 59){
        sec++;
    }
    else{
        sec = 0;
        min++;
    }
    if(min < 10){
       time = "Timer: 0"+min+":"; 
    }
    else{
        time = "Timer: "+min+":"; 
    }
    if(sec < 10){
        time += "0"+sec;
    }
    else{
        time += sec;
    }
    document.getElementById("timeKeeper").innerHTML = time;
}

function resetGame(){
    var session = document.getElementById("gameSession");
    puzlTop = 0;
    puzlLeft = 0;
	var imgs =["background.jpg", "Image-2.jpg", "Image-3.jpg", "image-4.jpg"];
    alignGrid(imgs[counter]);
    sessionStart = false;
    clearInterval(timer);
    document.getElementById("timeKeeper").innerHTML = "Timer: 00:00";
    document.getElementById("moves").innerHTML = "Moves:";
    min = 0;
    sec = 0;
	move = 0;
}
