




var sessionStart = false;
var shuffleBtn, puzzlePiece, puzzleArea;
var ptop = 0, pleft = 0, counter = 0, min = 0, sec = 0, move = 0, timer;


function alignGrid(img){
    var i;
    for (i = 0; i < puzzlePiece.length; i++){
        puzzlePiece[i].className = "puzzlepiece";
        puzzlePiece[i].style.top = ptop + "px";
        puzzlePiece[i].style.left = pleft + "px";
        puzzlePiece[i].webkitTransition = "all 1000ms ease";
        puzzlePiece[i].mozTransition = "all 1000ms ease";
        puzzlePiece[i].msTransition = "all 1000ms ease";
        puzzlePiece[i].oTransition = "all 1000ms ease";
        puzzlePiece[i].style.transition = "all 1000ms ease";
        puzzlePiece[i].style.backgroundImage =  "url('./img/"+img+"')";
        pleft = pleft + 100;
        if(pleft > 300){
            ptop = ptop + 100;
            pleft = 0;
        }
        puzzlePiece[i].style.backgroundPosition = "-" + puzzlePiece[i].style.left + " " + "-" + puzzlePiece[i].style.top;
        puzzlePiece[i].onmouseover = function(){
            if(validMove(this.style.left, this.style.top)){
                this.classList.add("movablepiece");
                this.style.cursor = "pointer";
            }
        }
        puzzlePiece[i].onmouseout = function(){
            this.classList.remove("movablepiece");
            this.style.cursor = "context-menu";
        }
        puzzlePiece[i].onmousedown = function(){
            if(validMove(this.style.left, this.style.top)){
                movesCounter();
                var lst = swap(this.style.left, this.style.top);
                this.style.left = lst[0];
                this.style.top = lst[1];
            }
        }
    }
    ptop = 300;
    pleft = 300;
}



function shuffle(){
    if(!sessionStart){
        timer = setInterval(timekeeper,1000);
        var i, l;
        var lst2 = [];
        for(let k = 0; k < 100; k++){
            for(i = 0; i < puzzlePiece.length; i++){
                if(validMove(puzzlePiece[i].style.left, puzzlePiece[i].style.top)){
                    lst2.push([puzzlePiece[i],i]);
                }
            }
            if(lst2.length != 0){
                var ranNum = Math.floor(Math.random() * lst2.length);
                var lst = swap(lst2[ranNum][0].style.left, lst2[ranNum][0].style.top);
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
    nextBtn.appendChild(document.createTextNode("Next Img"));
    resetBtn.appendChild(document.createTextNode("Reset Game"));
    var btnList = [shuffleBtn, nextBtn, resetBtn];
    for(var i = 0; i < btnList.length; i++){
        btnList[i].style.fontFamily = "Verdana";
        btnList[i].style.color = "#9400D3";
        btnList[i].style.fontSize = "18px";
        btnList[i].style.background = "#00ffff";
        btnList[i].style.padding = "10px 20px";
        btnList[i].style.textDecoration = "none";
        btnList[i].style.border = "none";
        btnList[i].style.margin = "2px";
        btnList[i].style.cursor = "pointer";
        if(i != 3){
            controls.appendChild(btnList[i]);
        }
    }
    nextBtn.addEventListener("click", nextImg);
    resetBtn.addEventListener("click", resetGame);
}