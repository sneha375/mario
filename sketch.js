var mario,marioImg,backgroundImg;
var obstacle1;
var invisibleGround,obstaclesgroup,bricksgroup,mario_collided,restartimg,gameoverimg,restart,gameover;
var bg;
var jumpSound,dieSound,checkPointSound;
var gameState="play";

var brickImg;
var score;
var brick;
function preload(){
  
  marioImg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  backgroundImg=loadImage("bg.png");
  ground2img=loadImage("ground2.png")
  obstacle1=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
 
  brickImg=loadImage("brick.png");
  mario_collided=loadAnimation("collided.png")
  restartimg=loadImage("restart.png")
  gameoverimg=loadImage("gameOver.png")
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkPointSound=loadSound("checkPoint.mp3");
  
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
  obstaclesgroup=new Group();
  bricksgroup=new Group();
  
  
  
  bg=createSprite(300,height-70);
  bg.addImage("bg",ground2img);
  bg.scale=2;
 
  
  mario=createSprite(50,height-160,20,20);
  mario.addAnimation("mario",marioImg);
  mario.addAnimation("collision",mario_collided)
  mario.scale=2; 
  
  gameover=createSprite(width-700,height-500,10,10);
  gameover.addImage("over1",gameoverimg);
  gameover.scale=2;
  
  restart=createSprite(width-680,height-400,10,10);
  restart.addImage("starting",restartimg);
  restart.scale=1;
  
  gameover.visible=false;
  restart.visible=false;
  
  invisibleGround=createSprite(50,height-140,600,10)
  invisibleGround.visible=false;
  
  mario.setCollider("rectangle",0,0,20,mario.height);
 // mario.debug=true;
  
  score=0;
  
}
function draw(){
  
 
  background(backgroundImg);
  if(gameState==="play"){
    
     bg.velocityX=-(10+score/10);
    
  if(bg.x<300){
    bg.x=bg.width/2;
    
  }
  mario.changeAnimation("mario",marioImg);
    for (i = 0; i < bricksgroup.length; i++) 
    {
      if (mario.isTouching(bricksgroup.get(i))) 
      {
      score = score + 1;
      bricksgroup.get(i).destroy();
      }
    }
      if(score>0 && score%10==0){
        checkPointSound.play();
      }
    console.log(mario.y);
    if(keyDown("space")){
      mario.velocityY=-14;
      jumpSound.play();
    } 
    mario.velocityY=mario.velocityY+0.8;
    
    if(obstaclesgroup.isTouching(mario)){
      gameState="end";
      dieSound.play();
    }
  
  obstacles();
  bricks();
  
  } 
  if(gameState==="end"){
    
    gameover.visible=true;
    restart.visible=true;
    bg.velocityX=0;
    mario.velocityY=0;
    mario.changeAnimation("collision",mario_collided);
    obstaclesgroup.setVelocityXEach(0)
    bricksgroup.setVelocityXEach(0)
    obstaclesgroup.setLifetimeEach(-1);
    bricksgroup.setLifetimeEach(-1);  
  }
    if(mousePressedOver(restart)){
       reset();
     }
    mario.collide(invisibleGround);
    drawSprites();
    fill("white");
    textSize(20);
    text("Score:"+score,width-150,40);
   
}
function obstacles(){
  if(frameCount%60===0){
    var obstacle=createSprite(width-20,height-170);
    obstacle.velocityX=-(10+score/10);
    obstacle.lifetime=width;
    obstacle.addAnimation("obstacle",obstacle1);
    obstaclesgroup.add(obstacle);
    }  
}


function bricks(){
  if(frameCount%30===0){       
     brick=createSprite(width-20,Math.round(random(height-500,height-300)));
     brick.velocityX=-(10+score/10);
     brick.lifetime=width;
     brick.addImage("brick",brickImg);
     brick.depth=mario.depth;
     mario.depth=mario.depth+1;
     bricksgroup.add(brick);
   }
}
function reset(){
  score=0;
  obstaclesgroup.destroyEach();
  bricksgroup.destroyEach();
  gameState="play";
  gameover.visible=false;
  restart.visible=false;
}