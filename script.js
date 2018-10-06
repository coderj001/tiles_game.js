var c = document.getElementById("myCanvas")
var ctx = c.getContext("2d")
// canvas 

var x= c.width/2
var y=c.height-30
  //position of the ball
var dx=+2
var dy=-2
// speed of ball or movement
var leftPress=false
var rightPress=false
//key use
var ballRadius=10

var paddleHeight=10
var  paddleWidth=70
var paddleX=(c.width-paddleWidth)/2
var paddleY=(c.height-paddleHeight)
//paddle size and position
var brickRowCount=3
var brickColumnCount=5
var brickWidth=75
var brickHeight=20
var brickPadding=10
var brickOffsetTop=30
var brickOffsetLeft=30
//bricks draw
var score=0

var live=3

var bricks = []
for(var cl=0; cl < brickColumnCount; cl++) {
    bricks[cl] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[cl][r] = { x: 0, y: 0,status:1 }; // keep the position of each brick a
    }
}
//2d-array inilized in js 
function drawBrick(){
  for (var cl=0;cl<brickColumnCount;cl++){
    for (var r=0;r<brickRowCount;r++){
      brickX=(cl*(brickWidth+brickPadding))+brickOffsetLeft
      brickY=(r*(brickHeight+brickPadding))+brickOffsetTop
      if (bricks[cl][r].status==1){
      bricks[cl][r].x=brickX
      bricks[cl][r].y=brickY
      ctx.beginPath()
      ctx.rect(brickX, brickY, brickWidth, brickHeight)
      ctx.fillStyle="#0095DD"
      ctx.stroke()
      ctx.closePath()
      }
    }
  }
}
// drawing bricks
function drawPaddle(){
  ctx.beginPath()
  ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight)
  ctx.fillStyle="#0095DD"
  ctx.fill()
  ctx.closePath()
  
}
// drawing paddles
function drawBall(){
  ctx.beginPath()
  ctx.arc(x,y,ballRadius,0,Math.PI*2)
  ctx.fillStyle="blue"
  ctx.fill()
  ctx.closePath()
}
// drawing the ball
function draw(){
  ctx.clearRect(0,0,c.width,c.height)  // clearing initial drawing
  drawBall()
  drawBrick()
  drawPaddle()
  collision()
  document.getElementById("score").innerHTML=score
  document.getElementById("live").innerHTML=live

  if(y + dy < ballRadius) {      // conditions of ball strick with wall on up
    dy = -dy;
  }
  else if(y + dy > c.height-ballRadius ){    // condition of ball strick with down
    if(x > paddleX && x < paddleX + paddleWidth) {  // condition for ball strick with paddles
            dy = -dy;
        }
    else{
                // lives counter
      live--
      if(!live){ // game over condition
      alert("GameOver")
      document.location.reload()
        }
      else{     // inilized the position of ball 
      x = c.width/2;
    y = c.height-30;
    dx = 2;
    dy = -2;
    paddleX = (c.width-paddleWidth)/2;
      }
    }
  }
  if (x + dx <ballRadius || x + dx > c.width-ballRadius){  // condition of ball strick with left and right side wall
    dx = -dx
  }
  x+=dx
  y+=dy
  if(rightPress && paddleX < c.width-paddleWidth ){  // moving the paddles
    paddleX +=7
  }
  else if(leftPress && paddleX > 0){
    paddleX -=7
  }
}
// keyDownHandler and keyUpHandler both function is imp for movement of the paddle once it is true another is false so that paddle move once at a time
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPress = true;
    }
    else if(e.keyCode == 37) {
        leftPress = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPress = false;
    }
    else if(e.keyCode == 37) {
        leftPress = false;
    }
}
 function collision(){
   for (var i=0;i<brickColumnCount;i++){
     for(var j=0;j<brickRowCount;j++){
       var b=bricks[i][j]
       if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
         b.status=0
         b.x=0
         b.y=0
         score +=1
         if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
     }
   }
 }
 }
// collisation with bricks
function mouseMoveHandler(e) {
    var relativeX = e.clientX - c.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false)
document.addEventListener("keyup",keyUpHandler,false)
document.addEventListener("keydown",keyDownHandler,false)

setInterval(draw,10)