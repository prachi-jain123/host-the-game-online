//gamestates
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var path,boy,cash,diamonds,jewellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelleryG,swordGroup;
var endimage, endgame;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endimage = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jewelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  
  if (gamestate == PLAY) {
    background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }

    if (boy.isTouching(cashG)) {
      treasureCollection = treasureCollection + 50; 
      cashG.destroyEach();
      
    }
    else if (boy.isTouching(diamondsG)) {
     treasureCollection = treasureCollection + 140;     
      diamondsG.destroyEach();
      
    }else if(boy.isTouching(jewelleryG)) {
      treasureCollection = treasureCollection + 100;
      jewelleryG.destroyEach();
      
    }else {
      if(boy.isTouching(swordGroup)) {
        swordGroup.destroyEach();
        gamestate = END;        
       }
    }
  
    createCash();
  createDiamonds();
  createSword();
  createJewellery();
  }
  
    else if (gamestate == END) {
      path.velocityY = 0;
      jewelleryG.setVelocityYEach(0);      
      diamondsG.setVelocityYEach(0);      
      cashG.setVelocityYEach(0);
      endgame = createSprite(200,200,10,10);
      endgame.addImage(endimage);
      endgame.scale = 0.5;
    }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 80 == 0) {
  var jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 3;
  jewellery.lifetime = 150;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}