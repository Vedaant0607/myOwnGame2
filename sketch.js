var PLAY = 1;
var END = 0;
var SHOOT = 2;
var gameState = PLAY;

var trex,boss,bossGroup,bossImg,bossBullet,bossBullet2,bossBullet3,bossBullet4;
var ground, invisibleGround, groundImage,backdrop,backgroundImg;
var heart1,heart2,heart3,heart4,heart5,heart6,heart7,heart8,heart9,heart10,heartImg,emptyHeartImg;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle;
var hero, hero1, shoot, bullet, bulletImg,enemyBullet;
var enemyBulletGroup;
var score = 0;
var particles = [];
var particle = 0;
var death = 0;
var hits = 0
var gameOver, restart;

function preload() {

    cloudImage = loadImage("cloud.png");
    hero = loadAnimation("hero1.png", "hero2.png", "hero3.png", "hero4.png", "hero5.png", "hero6.png", "hero7.png", "hero8.png", "hero9.png", "hero10.png");
    hero1 = loadAnimation("hero16.png", "hero16.png", "hero16.png", "hero16.png", "hero16.png", "hero16.png");

    shoot = loadImage("shoot.jpg");

    bulletImg = loadImage("bullet1.png");
    obstacle1 = loadAnimation("bigenemies.png", "bigenemies2.png", "bigenemies3.png", "bigenemies4.png", "bigenemies5.png");
    emptyHeartImg = loadImage("emptyhearts.png");

    heartImg = loadImage("hearts.png");

    backgroundImg = loadAnimation("bg.jpg","bg.jpg","bg.jpg","bg.jpg");
    bossImg = loadImage("boss.png");
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(800,400);
    backdrop = createSprite(400,200,800,400);
    backdrop.addAnimation("background",backgroundImg);
    backdrop.scale = 1.6;
    backdrop.x = backdrop.width / 2;
    backdrop.velocityX = -12;

    trex = createSprite(50, 320, 20, 50);
    trex.addAnimation("PC", hero);
    trex.addAnimation("Croutch", hero1);
    console.log(trex.x);
     heart1 = createSprite(50,50,10,10);
     heart1.addImage("fullHealth",heartImg);
     heart1.addImage("noHealth",emptyHeartImg);
     heart1.scale = 0.1;
     heart2 = createSprite(70,50,10,10);
     heart2.addImage("fullHealth",heartImg);
     heart2.addImage("noHealth",emptyHeartImg);
     heart2.scale = 0.1;

     heart3 = createSprite(90,50,10,10);
     heart3.addImage("fullHealth",heartImg);
     heart3.addImage("noHealth",emptyHeartImg);
     heart3.scale = 0.1;

     heart4 = createSprite(110,50,10,10);
     heart4.addImage("fullHealth",heartImg);
     heart4.addImage("noHealth",emptyHeartImg);
     heart4.scale = 0.1;

     heart5 = createSprite(130,50,10,10);
     heart5.addImage("fullHealth",heartImg);
     heart5.addImage("noHealth",emptyHeartImg);
     heart5.scale = 0.1;

     heart6 = createSprite(150,50,10,10);
     heart6.addImage("fullHealth",heartImg);
     heart6.addImage("noHealth",emptyHeartImg);
     heart6.scale = 0.1;

     heart7 = createSprite(170,50,10,10);
     heart7.addImage("fullHealth",heartImg);
     heart7.addImage("noHealth",emptyHeartImg);
     heart7.scale = 0.1;

     heart8 = createSprite(190,50,10,10);
     heart8.addImage("fullHealth",heartImg);
     heart8.addImage("noHealth",emptyHeartImg);
     heart8.scale = 0.1;

     heart9 = createSprite(210,50,10,10);
     heart9.addImage("fullHealth",heartImg);
     heart9.addImage("noHealth",emptyHeartImg);
     heart9.scale = 0.1;

     heart10 = createSprite(230,50,10,10);
     heart10.addImage("fullHealth",heartImg);
     heart10.addImage("noHealth",emptyHeartImg);
     heart10.scale = 0.1;

   death = 1;

   

   // ground = createSprite(400, 780, 800, 20);
  //  ground.addImage("ground", groundImage);

  bullet = createSprite(200, 200, 50, 50);
bullet.visible = false

enemyBullet = createSprite(700,250,15,10);
enemyBullet.visible = false;

    gameOver = createSprite(500, 400);
    gameOver.addImage("over",gameOverImg);

    restart = createSprite(550, 350);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(400, 330, 800, 10);
    invisibleGround.visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();
   enemyBulletGroup = new Group();
   bossGroup = new Group();
}

function draw() {
    background(0);


    if (gameState === PLAY) {
        backdrop.velocityX = -12;

        if (keyDown(UP_ARROW)  ) {
            trex.changeAnimation("PC")
          
        }
        if (keyDown("space") && trex.y>200) {
            trex.velocityY = -20;
            trex.changeAnimation("PC");
         }
            trex.velocityY = trex.velocityY + 0.8;     
        
        
      

        if (backdrop.x < 0) {
            backdrop.x = backdrop.width / 2;
        }
        if (keyWentDown("R")) {
            spawnBullet();  
            
        }
        
        trex.collide(invisibleGround);
         spawnObstacles();
        if (obstaclesGroup.isTouching(bullet)){
               obstaclesGroup.destroyEach();
               bullet.visible = false;
               score = score+10;
           }
           
           
       // if(score === 2000){
        //    spawnBoss();
         //   obstaclesGroup.destroyEach();
         //   enemyBullet.destroy();
      //  }

    }
    if(enemyBulletGroup.isTouching(trex) && death===1){
       heart1.changeImage("noHealth");
       enemyBullet.x = 700;
       enemyBullet.velocityX=0;
       enemyBullet.visible = false;
       death = death+1;
       console.log(death);
    }
    if(enemyBulletGroup.isTouching(trex)&& death ===2){
        heart2.changeImage("noHealth");
        enemyBullet.x = 700;
        enemyBullet.velocityX=0;
        enemyBullet.visible = false;
        death = death+1;
        console.log(death);

     }
     if(enemyBulletGroup.isTouching(trex)&& death ===3){
        heart3.changeImage("noHealth");
        enemyBullet.x = 700;
       enemyBullet.velocityX=0;
       enemyBullet.visible = false;
        death = death+1;       
        console.log(death);

     }
 
     if(enemyBulletGroup.isTouching(trex) && death ===4){
        heart4.changeImage("noHealth");
        enemyBullet.x = 700;
        enemyBullet.velocityX=0;
        enemyBullet.visible = false;
        death = death+1;
        console.log(death);

     }
 
     if(enemyBulletGroup.isTouching(trex)&& death === 5){
        heart5.changeImage("noHealth");
        enemyBullet.x = 700;
        enemyBullet.velocityX=0;
        enemyBullet.visible = false;
        death = death+1;
        console.log(death);

     }
 
     if(enemyBulletGroup.isTouching(trex) && death === 6){
        heart6.changeImage("noHealth");
        enemyBullet.x = 700;
        enemyBullet.velocityX=0;
        enemyBullet.visible = false;
        death = death+1;
        console.log(death);

     }
 
     if(enemyBulletGroup.isTouching(trex) && death === 7){
        heart7.changeImage("noHealth");
        enemyBullet.x = 700;
       enemyBullet.velocityX=0;
       enemyBullet.visible = false;
        death = death+1;
        console.log(death);

     }
 
     if(enemyBulletGroup.isTouching(trex) && death ===8){
        heart8.changeImage("noHealth");
        enemyBullet.x = 700;
       enemyBullet.velocityX=0;
       enemyBullet.visible = false;
        death = death+1;
        console.log(death);

     }
 
     if(enemyBulletGroup.isTouching(trex) && death ===9){
        heart9.changeImage("noHealth");
        enemyBullet.x = 700;
        enemyBullet.velocityX=0;
        enemyBullet.visible = false;
        death = death+1;
        console.log(death);

     }
     if(enemyBulletGroup.isTouching(trex) && death ===10){
        heart10.changeImage("noHealth");
        enemyBullet.x = 700;
        enemyBullet.velocityX=0;
        enemyBullet.visible = false;
        death = death+1;
        console.log(death);

        gameState = END;
     } 
     else if (gameState === END) {
       
        backdrop.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
       // enemyBullet.destroy();        
        
        obstaclesGroup.setLifetimeEach(-1);
     }  
     drawSprites();
    text("Score: " + score, 500, 50);
    

}




function spawnObstacles() {
    if (frameCount % 60 === 0) {
        obstacle = createSprite(800, 280, 10, 100);
          
        obstacle.addAnimation("obstacle", obstacle1);
        obstacle.debug = true;
    if(frameCount % 60 === 0){
        enemyBullet.x = 700;
        enemyBullet.visible = true      
       enemyBullet.velocityX = -30; 
       enemyBullet.shapeColor = color("yellow");
       enemyBulletGroup.add(enemyBullet);
    } 
       // obstacle.scale = 0.5;
       obstacle.velocityX = -12;
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
       
    }
}
function spawnBullet() {
    bullet.x = trex.x;
    bullet.visible = true;
    bullet.addImage("shoot",bulletImg);
    bullet.scale = 0.05
    bullet.velocityX= 50;
    bullet.y = trex.y -20;
    //console.log(bullet.depth)

   
}
function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        trex.changeAnimation("Croutch")

    }
}
function spawnBoss(){
   boss = createSprite(650,180,10,10);
   boss.addImage(bossImg);
   boss.scale = 0.3;
   if(frameCount%50 ===0){
   var no = random(1,2)
bossGroup.add(boss);
   bossBullet2 = createSprite(700,290,20,10);
   bossBullet2.velocityX = -30;
   bossBullet3 = createSprite(700,320,20,10);
   bossBullet3.velocityX = -30;
   bossBullet4 = createSprite(700,100,20,10);
   bossBullet4.velocityX = -30;
  if(no === 1) {
      bossBullet4.y = 350;
  }
  if(no === 2) {
    bossBullet4.y = 200;
}}
}
if(bossGroup.isTouching(bullet)){
    bullet.visible = false;
}
if(bullet.x = boss.x && hits === 50){
boss.visible = false;

if(keyDown("space")){
    bullet.velocityX = 100;
}
}

