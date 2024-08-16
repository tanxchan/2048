var gamegrid = [[0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]];
var moving = false;
const movingdelay = 110;
const anidelay = 100;
function diff(a,b){
    let d = false;
    for (let i = 0; i<4; i++){
        for (let j = 0; j<4; j++){
            if (b[i][j]!=a[i][j]){
                d = true;
            }
        }
    }
    return d;
}
function bg(x, y){
    let u = document.getElementsByClassName('container')[0]
    let c = document.createElement('div')
    c.setAttribute('class', 'back')
    c.classList.add('row'+x)
    c.classList.add('col'+y)
    u.appendChild(c)
}
function spawn(x, y, n){
    gamegrid[x][y] = n;
    let u = document.getElementsByClassName('game-container')[0]
    let c = document.createElement('div')
    c.setAttribute('class', 'tile')
    let p = document.createElement('b')
    p.innerHTML = n;
    c.appendChild(p)
    c.classList.add('trow'+x)
    c.classList.add('tcol'+y)
    c.classList.add('val'+n)
    u.appendChild(c)
}
function rspawn(){
    let zeros = [];
    for (let i = 0; i<4; i++){
        for (let j = 0; j<4; j++){
            if (gamegrid[i][j] ==0){
                zeros.push([i,j])
            }
        }
    }
    let p = Math.floor(Math.random()*zeros.length)
    let n = 2;
    if (Math.random()>0.9){
        n = 4;
    }
    spawn(zeros[p][0], zeros[p][1], n)
}
function find(x, y){
    let v = String('tile trow'+x+' tcol'+y)
    return document.getElementsByClassName(v)[0]
}
function move(x1,y1,x2,y2){
    let c = find(x1,y1)
    c.classList.remove('tcol'+y1)
    c.classList.add('tcol'+y2)
    c.classList.remove('trow'+x1)
    c.classList.add('trow'+x2)
}

function horCrush(){
    let crushed = [[],[],[],[]]
    for (let i = 0; i<4; i++){
        for (let j = 0; j<4; j++){
            let v = gamegrid[i][j]
            if (v>0){
                crushed[i].push(v);
            }
        }
    }
    //console.log(crushed)
    return crushed;
}
function verCrush(){
    let crushed = [[],[],[],[]]
    for (let i = 0; i<4; i++){
        for (let j = 0; j<4; j++){
            let v = gamegrid[i][j]
            if (v>0){
                crushed[j].push(v);
            }
        }
    }
    //console.log(crushed)
    return crushed;
}
function rightCrush(){
    let crushed = horCrush();
    let ng = [[],[],[],[]]
    for (let i = 0; i<4; i++){
        let row = crushed[i]
        let c = 0;
        for (let j = row.length-1; j>-1; j--){
            if (row[j] == c){
                ng[i].unshift(c*2);
                c = 0;
            }
            else if(c == 0){
                c = row[j];
            }else{
                ng[i].unshift(c)
                c = row[j]
            }
        }
        if (c!=0){
            ng[i].unshift(c)
        }
    }
    for (let i = 0; i<4; i++){
        while (ng[i].length<4){
            ng[i].unshift(0)
        }
    }
    return ng;
}
function leftCrush(){
    let crushed = horCrush();
    let ng = [[],[],[],[]]
    for (let i = 0; i<4; i++){
        let row = crushed[i]
        let c = 0;
        for (let j = 0; j<row.length; j++){
            if (row[j] == c){
                ng[i].push(c*2);
                c = 0;
            }
            else if(c == 0){
                c = row[j];
            }else{
                ng[i].push(c)
                c = row[j]
            }
        }
        if (c!=0){
            ng[i].push(c)
        }
    }
    for (let i = 0; i<4; i++){
        while (ng[i].length<4){
            ng[i].push(0)
        }
    }
    return ng;
}
function upCrush(){
    let crushed = verCrush();
    let ng = [[],[],[],[]]
    for (let i = 0; i<4; i++){
        let col = crushed[i]
        let c = 0;
        for (let j = 0; j<col.length; j++){
            if (col[j] == c){
                ng[i].push(c*2);
                c = 0;
            }
            else if(c == 0){
                c = col[j];
            }else{
                ng[i].push(c)
                c = col[j]
            }
        }
        if (c!=0){
            ng[i].push(c)
        }
    }
    for (let i = 0; i<4; i++){
        while (ng[i].length<4){
            ng[i].push(0)
        }
    }
    let ngl = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (let i = 0; i<4; i++){
        for (let j = 0; j<4; j++){
            ngl[i][j] = ng[j][i];
        }
    }
    return ngl;
}
function downCrush(){
    let crushed = verCrush();
    let ng = [[],[],[],[]]
    for (let i = 0; i<4; i++){
        let col = crushed[i]
        let c = 0;
        for (let j = col.length-1; j>-1; j--){
            if (col[j] == c){
                ng[i].unshift(c*2);
                c = 0;
            }
            else if(c == 0){
                c = col[j];
            }else{
                ng[i].unshift(c)
                c = col[j]
            }
        }
        if (c!=0){
            ng[i].unshift(c)
        }
    }
    for (let i = 0; i<4; i++){
        while (ng[i].length<4){
            ng[i].unshift(0)
        }
    }
    let ngl = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (let i = 0; i<4; i++){
        for (let j = 0; j<4; j++){
            ngl[i][j] = ng[j][i];
        }
    }
    return ngl;
}
function canMove(){
    if (diff(upCrush(), gamegrid)){
        return true;
    }
    if (diff(downCrush(), gamegrid)){
        return true;
    }
    if (diff(leftCrush(), gamegrid)){
        return true;
    }
    if (diff(rightCrush(), gamegrid)){
        return true;
    }
    return false;
}
function restart(){
    let s = document.getElementsByClassName('game-message')[0];
    s.setAttribute('class', 'game-message');
    s.innerHTML='';
    let c = document.getElementsByClassName('tile');
    for (let i = c.length-1; i>=0; i--){
        setTimeout(()=>{c[i].parentNode.removeChild(c[i])},10);
    }
    gamegrid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    rspawn();
    rspawn();
    moving=false;
}
function cont(){
    let s = document.getElementsByClassName('game-message')[0];
    s.setAttribute('class', 'game-message');
    s.innerHTML='';
    moving=false;
}
function won(){
    setTimeout(()=>{moving = true;},120);
    let s = document.getElementsByClassName('game-message')[0];
    s.classList.add('game-won');
    //s.classList.remove('game-message');
    let m = document.createElement('b');
    m.innerHTML = 'You Won!';
    let c = document.createElement('div');
    c.appendChild(m);
    s.appendChild(c);
    let b = document.createElement('div');
    let r = document.createElement('b');
    r.innerHTML = 'restart';
    b.appendChild(r);
    b.setAttribute('class', 'restart-button');
    s.appendChild(b);
    b.addEventListener('click', restart);
    let b2 = document.createElement('div');
    let c2 = document.createElement('b');
    c2.innerHTML = 'continue';
    b2.appendChild(c2);
    b2.setAttribute('class', 'restart-button');
    s.appendChild(b2);
    b2.addEventListener('click', cont);
}
function lost(){
    setTimeout(()=>{moving=true;});
    let s = document.getElementsByClassName('game-message')[0];
    s.classList.add('game-lost');
    //s.classList.remove('game-message');
    let m = document.createElement('b');
    m.innerHTML = 'You Lost!';
    let c = document.createElement('div');
    c.appendChild(m);
    s.appendChild(c);
    let b = document.createElement('div');
    let r = document.createElement('b');
    r.innerHTML = 'restart';
    b.appendChild(r);
    b.setAttribute('class', 'restart-button');
    s.appendChild(b);
    b.addEventListener('click', restart);
}
function checkstates(){
    setTimeout(()=>
    {if (!canMove()){
        lost();
    }}, 10)
}
function up(){
    if (moving){
        console.log('moving')
        return 0;
    }
    let ng = upCrush();
    if (diff(ng,gamegrid)){
        moving = true;
        setTimeout(()=>{moving = false}, movingdelay)
        for (let j = 0; j<4; j++){
            let c = 0;
            let r = false;
            for (let i = 0; i<4; i++){
                if (gamegrid[i][j]!=0){
                    if (ng[c][j] == gamegrid[i][j]){
                        move(i,j,c,j);
                        c++;
                    }
                    else if (r){
                        let e = find(i,j)
                        move(i,j,c,j);
                        setTimeout(()=>{e.parentNode.removeChild(e)},anidelay)
                        c++;
                        r = false;
                    }else{
                        let e = find(i,j)
                        move(i,j,c,j);
                        let y = c;
                        setTimeout(()=>{e.parentNode.removeChild(e); spawn(y,j,ng[y][j])},anidelay)
                        if (ng[y][j] == 2048){
                            won()
                        }
                        r = true;
                    }
                }
            }
        }
        gamegrid = ng;
        rspawn();
        checkstates();
    }
}
function down(){
    if (moving){
        console.log('moving')
        return 0;
    }
    let ng = downCrush();
    if (diff(ng,gamegrid)){
        moving = true;
        setTimeout(()=>{moving = false}, movingdelay)
        for (let j = 0; j<4; j++){
            let c = 3;
            let r = false;
            for (let i = 3; i>=0; i--){
                if (gamegrid[i][j]!=0){
                    if (ng[c][j] == gamegrid[i][j]){
                        move(i,j,c,j);
                        c--;
                    }
                    else if (r){
                        let e = find(i,j)
                        move(i,j,c,j);
                        setTimeout(()=>{e.parentNode.removeChild(e)},anidelay)
                        c--;
                        r = false;
                    }else{
                        let e = find(i,j)
                        move(i,j,c,j);
                        let y = c;
                        setTimeout(()=>{e.parentNode.removeChild(e); spawn(y,j,ng[y][j])},anidelay)
                        if (ng[y][j] == 2048){
                            won()
                        }
                        r = true;
                    }
                }
            }
        }
        gamegrid = ng;
        rspawn();
        checkstates();
    }
}
function left(){
    if (moving){
        console.log('moving')
        return 0;
    }
    let ng = leftCrush();
    if (diff(ng,gamegrid)){
        moving = true;
        setTimeout(()=>{moving = false}, movingdelay)
        for (let i = 0; i<4; i++){
            let c = 0;
            let r = false;
            for (let j = 0; j<4; j++){
                if (gamegrid[i][j]!=0){
                    if (ng[i][c] == gamegrid[i][j]){
                        move(i,j,i,c);
                        c = c+1;
                    }
                    else if (r){
                        let e = find(i,j)
                        move(i,j,i,c);
                        setTimeout(()=>{e.parentNode.removeChild(e)},anidelay)
                        c = c+1;
                        r = false;
                    }else{
                        let e = find(i,j)
                        move(i,j,i,c);
                        let y = c;
                        setTimeout(()=>{e.parentNode.removeChild(e); spawn(i,y,ng[i][y])},anidelay)
                        if (ng[i][y] == 2048){
                            won()
                        }
                        r = true;
                    }
                }
            }
        }
        gamegrid = ng;
        rspawn();
        checkstates();
    }
}
function right(){
    if (moving){
        console.log('moving')
        return 0;
    }
    let ng = rightCrush();
    if (diff(ng,gamegrid)){
        moving = true;
        setTimeout(()=>{moving = false}, movingdelay)
        for (let i = 0; i<4; i++){
            let c = 3;
            let r = false;
            for (let j = 3; j>-1; j--){
                if (gamegrid[i][j]!=0){
                    if (ng[i][c] == gamegrid[i][j]){
                        move(i,j,i,c);
                        c--;
                    }
                    else if (r){
                        let e = find(i,j)
                        move(i,j,i,c);
                        setTimeout(()=>{e.parentNode.removeChild(e)},anidelay)
                        c--;
                        r = false;
                    }else{
                        let e = find(i,j)
                        move(i,j,i,c);
                        let y = c;
                        setTimeout(()=>{e.parentNode.removeChild(e); spawn(i,y,ng[i][y])},anidelay)
                        if (ng[i][y] == 2048){
                            won()
                        }
                        r = true;
                    }
                }
            }
        }
        gamegrid = ng;
        rspawn();
        checkstates();
    }
}
for (let i = 0; i<4; i++){
    for (let j = 0; j<4; j++){
        bg(i,j)
    }
}
rspawn();
rspawn();
document.addEventListener('keydown', function(event) {
        const callback = {
        "ArrowLeft"  : left,
        "ArrowRight" : right,
        "ArrowUp"    : up,
        "ArrowDown"  : down,
    }[event.key]
    callback?.() // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
});

document.getElementsByClassName('restart-button')[0].addEventListener('click', restart);