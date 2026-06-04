        let gameOver = false;
    let turn = 'x';
var title = document.querySelector('.title')
let squares = [];

// ده الكسابن
function end(num1,num2,num3){
     title.innerHTML = `${'you'} win`;
 document.getElementById('item' +num1). style.background ='#00ff04ff';
 document.getElementById('item' +num2). style.background ='#00ff04ff';
 document.getElementById('item' +num3). style.background ='#00ff04ff';

 setInterval(function(){title.innerHTML += '.'},1000)
 setTimeout(function(){location.reload()},3000 )
}


// حالة الخسارة / التعادل
function lose(){
    title.innerHTML = `You Lose`;
    // فتح كل البوكسات باللون الأحمر
    for(let i=1; i<10; i++){
        document.getElementById('item'+i).style.background = '#ff0000';
    }
    setInterval(function(){title.innerHTML += '😭'},1000)
    setTimeout(function(){location.reload()},3000 )
}


function winnner()
{



for(let i = 1; i<10;i++)
{  
 squares[i] = document.getElementById('item' + i).innerHTML;
}

if(squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != '')
{
end(1,2,3);
}
else if(squares[7] == squares[8] && squares[8] == squares[9] && squares[8] != '')
    {
end(7,8,9);
    }
    else if(squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '')
    {
end(1,4,7);
    }
        else if(squares[4] == squares[5] && squares[5] == squares[6] && squares[5] != '')
    {
end(4,5,6);
    }
        else if(squares[2] == squares[5] && squares[5] == squares[8] && squares[5] != '')
    {
end(2,5,8);
    }
        else if(squares[3] == squares[6] && squares[6] == squares[9] && squares[6] != '')
    {
end(3,6,9);
    }
        else if(squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != '')
    {
end(1,5,9);
    }
        else if(squares[3] == squares[5] && squares[5] == squares[7] && squares[5] != '')
    {
end(3,5,7);
    }
    else {
        // هنا الشرط لو مفيش ولا واحدة فاضية ومفيش كسبان
        if(squares.every((sq, i) => i === 0 || sq !== '')) {
            lose();
        }

    }
}
function game(id)
{
    let element = document.getElementById(id);

    if (turn === 'x' && element.innerHTML == '')
    {
        element.innerHTML = 'X';

        if(checkWinner() !== null){
            winnner();
            return;
        }

        turn = 'o';

        setTimeout(aiMove, 300);
    }
}
function aiMove() {

    // يفوز لو يقدر
    for(let i=1;i<10;i++){
        let cell=document.getElementById('item'+i);
        if(cell.innerHTML===''){
            cell.innerHTML='O';
            if(checkWinner()==='O'){
                turn='x';
                winnner();
                return;
            }
            cell.innerHTML='';
        }
    }

    // يمنع فوز اللاعب
    for(let i=1;i<10;i++){
        let cell=document.getElementById('item'+i);
        if(cell.innerHTML===''){
            cell.innerHTML='X';
            if(checkWinner()==='X'){
                cell.innerHTML='O';
                turn='x';
                winnner();
                return;
            }
            cell.innerHTML='';
        }
    }

    // يأخذ المنتصف
    if(document.getElementById('item5').innerHTML===''){
        document.getElementById('item5').innerHTML='O';
    }
    else{
        let moves=[];
        for(let i=1;i<10;i++){
            if(document.getElementById('item'+i).innerHTML===''){
                moves.push(i);
            }
        }

        let move=moves[Math.floor(Math.random()*moves.length)];
        document.getElementById('item'+move).innerHTML='O';
    }

    turn='x';
    winnner();
}
function minimax(isMaximizing) {
    let result = checkWinner();

    if (result !== null) {
        if (result === 'O') return 10;
        if (result === 'X') return -10;
        if (result === 'draw') return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 1; i < 10; i++) {
            let cell = document.getElementById('item' + i);

            if (cell.innerHTML === '') {
                cell.innerHTML = 'O';
                let score = minimax(false);
                cell.innerHTML = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;

    } else {
        let bestScore = Infinity;

        for (let i = 1; i < 10; i++) {
            let cell = document.getElementById('item' + i);

            if (cell.innerHTML === '') {
                cell.innerHTML = 'X';
                let score = minimax(true);
                cell.innerHTML = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
function checkWinner() {
    let b = [];

    for (let i = 1; i < 10; i++) {
        b[i] = document.getElementById('item' + i).innerHTML;
    }

    const wins = [
        [1,2,3],[7,8,9],[1,4,7],
        [4,5,6],[2,5,8],[3,6,9],
        [1,5,9],[3,5,7]
    ];

    for (let w of wins) {
        let [a,b1,c] = w;

        if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
            return b[a];
        }
    }

    // تعادل
    let full = true;
    for (let i = 1; i < 10; i++) {
        if (b[i] === '') full = false;
    }

    if (full) return 'draw';

    return null;
}


winnner();
function end(num1,num2,num3){

    let winner = document.getElementById('item' + num1).innerHTML;

    if(winner === 'X'){
        title.innerHTML = 'You Win 🎉';
    }else{
        title.innerHTML = 'You Lose 😭';
    }

    document.getElementById('item' + num1).style.background ='#00ff04';
    document.getElementById('item' + num2).style.background ='#00ff04';
    document.getElementById('item' + num3).style.background ='#00ff04';

    setInterval(function(){
        title.innerHTML += '.';
    },1000);

    setTimeout(function(){
        location.reload();
    },3000);
}
if(squares.every((sq, i) => i === 0 || sq !== '')) {

    title.innerHTML = 'Draw 🤝';

    for(let i=1; i<10; i++){
        document.getElementById('item'+i).style.background = '#ffaa00';
    }

    setTimeout(function(){
        location.reload();
    },3000);
}
setTimeout(aiMove, 50);