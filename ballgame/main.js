var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
// khai báo object bóng
var x=20;y=20;
var dx =5,dy=2;
var radius = 10;
// kêt thúc

var paddle = {
    width:70,
    height:10,
    x:0,
    y:canvas.height-10,
    speed:10,

    isMovingLeft:false,
    isMovingRight:false,
}

var isGameOver = false;

var BrickConfig = {
    offsetX:25,
    offsetY:25,
    margin:25,
    width:70,
    height:15,
    totalRow:3,
    totalCol:5
};

var BrickList = [];

for(var i=0;i<BrickConfig.totalRow;i++){
    for(var j =0;j< BrickConfig.totalCol;j++) {
        BrickList.push({
           x:BrickConfig.offsetX+j*(BrickConfig.width+BrickConfig.margin),
           y:BrickConfig.offsetY+i*(BrickConfig.height+BrickConfig.margin),
            isBroken:false,
        });
    }
}


document.addEventListener('keyup', function(event,keyCode) {
    console.log("KEY UP");
    console.log(event);
    if(event.keyCode == 37){
        paddle.isMovingLeft = false;
     }else if(event.keyCode ==39){
         paddle.isMovingRight = false;
     }
})
document.addEventListener('keydown', function(event,keyCode) {
    console.log("KEY DOWN");
    console.log(event);
    if(event.keyCode == 37){
       paddle.isMovingLeft = true;
    }else if(event.keyCode ==39){
        paddle.isMovingRight = true;
    }
})

// ve bong 
function drawBall() {
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
    
}

/*
  2*offset + 5 * width + 4* margin = 500;
  ofset = margin = 25
  => width:70;
  row :3
  col :5
*/ 


function drawBrick(){
    BrickList.forEach(function(b){
       if(!b.isBroken){
        context.beginPath();
        context.rect(b.x,b.y,BrickConfig.width,BrickConfig.height);
        
        context.fill();
        context.closePath();
       }
    })
}

function drawPaddle(){
    context.beginPath();
    context.rect(paddle.x,paddle.y,paddle.width,paddle.height);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}
// setInterval(function(){
//     context.clearRect(0,0,canvas.width,canvas.height);
//     // ve bóng 
//     drawBall();
//     x += 2;
//     y +=2;
// },200);

function handleBallCollIdeBounds(){
    if(x<radius|| x> canvas.width-radius){
        dx= -dx;
    }
    if(y<radius ){
        dy = -dy;
    }
}

function handleBallCollidePaddle(){
    if(x + radius >= paddle.x && x + radius <= paddle.x+paddle.width &&  
        y+radius >= canvas.height - paddle.height){
            dy = -dy;
    }
}
 
function  handleBallCollideBricks(){
    BrickList.forEach(function(b){
        if(!b.isBroken){
            if(x >=b.x && x<=b.x+BrickConfig.width && 
                y+radius >=b.y && y - radius <=b.y + BrickConfig.height){
                    dy =-dy;
                    b.isBroken = true;
            }
        }
    })
}

function updateBallPosition(){
    x += dx;
    y +=dy;
}

function updatePaddlePosition(){
    if(paddle.isMovingLeft){
        paddle.x -= paddle.speed;
    }else if(paddle.isMovingRight){
        paddle.x += paddle.speed;
    }

    if(paddle.x<0){
        paddle.x = 0;
    }else if(paddle.x >canvas.width - paddle.width ){
        paddle.x = canvas.width-paddle.width;
    }
}
function checkGameOver(){
    if(y>canvas.height - radius){
        isGameOver = true;
    }
}

function handleGameOver(){
    alert("Game Over");
}


function draw(){
    if(!isGameOver){
        context.clearRect(0,0,canvas.width,canvas.height);
        // ve bóng 
        drawBall();
      
        drawBrick();
        updatePaddlePosition();
        handleBallCollidePaddle();
        handleBallCollIdeBounds();
        updateBallPosition();
        checkGameOver();
        handleBallCollideBricks();  
        drawPaddle();
        requestAnimationFrame(draw);
    }

}
draw();

