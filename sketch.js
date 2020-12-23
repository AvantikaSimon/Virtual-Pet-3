var dog;
var happyDog, lyingDog, lazyDog
var dogSitting_image, dogCrouching_image, dogRunning1, dogRunning2;
var database; 
var foodStock;
var foodStock_image;
var lastFed;
var milk_image;
var feedButton;
var addMilkButton;
var feedTime;
var lastFed;
var name;
var gameState;
var starting = 0;
var happy = 1;
var sleeping = 2;
var playing = 3; 
var bathing = 4;
var vaccineTime = 5;
var hungry = 6; 
var changeGameState;
var ReadGameState;
var bedroom_image, garden_image, washroom_image, livingRoom_image;
var vaccinationImage;
var injection_image;
var injection; 
var mainTitle;
var title;
var input;
var name;
var startButton;
var vaccineButton;
var vaccineTableButton;
var vaccineTable;

function preload(){
dogSitting_image = loadImage("images/dogImg.png");
dogCrouching_image = loadImage("images/dogImg1.png");
lyingDog = loadImage("images2/deadDog.png");
lazyDog = loadImage("images2/Lazy.png");
dogRunning1 = loadImage("images2/running.png");
dogRunning2 = loadImage("images2/runningLeft.png");
foodStock_image = loadImage("images2/Food Stock.png");
bedroom_image = loadImage("images2/Bed Room.png");
garden_image = loadImage("images2/Garden.png");
washroom_image = loadImage("images2/Wash Room.png");
livingRoom_image = loadImage("images2/Living Room.png");
vaccinationImage = loadImage("images2/Vaccination.jpg");
injection_image = loadImage("images2/Injection.png");
vaccineTable = loadImage("images2/dogVaccination.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(400, 300, 20, 50);
  dog = setImage("dog", dogSitting_image);
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  injection = createSprite(dog.x + 20, dog.y);
  injection = setImage("injection", injection_image);

  feedButton = createButton("Feed Your Doggo");
  addMilkButton = createButton("Add Milk");
  feedButton.position(150, 50);
  addMilkButton.position(200, 50);
  mainTitle = createElement('h1');
  mainTitle.html("Virtual Pet");
  mainTitle.position(220, 190);
  title = createElement('h2');
  title.html("Name Your New Doggo!");
  title.position(230, 220);
  input = createInput("Name");
  input.position(230, 250);
  startButton = createButton("Start");
  startButton.position(250, 270);
  name = input.value();
  vaccineButton = createButton("Vaccine");
  vaccineButton.position(450, 150);
  vaccineTableButton = createButton("Dog Vaccination Table (click to see)")
  vaccineTableButton.position(400, 50);

}

function draw() {  
background = setImage("living room", livingRoom_image);
gameState.update(starting);

startButton.mousePressed(start());
gameState.update(happy); 

vaccineButton.hide();
injection.hide();

textSize(2.5);
text("Current foodstock: " + foodStock, 350, 50);
if (lastFed > 12){
  text("Last Fed: " + lastFed-12 + "PM", 400, 50);
 }
if(lastFed < 12){
text("Last Fed: " + lastFed + "AM", 400, 50)
 }
 
else {if(lastFed === 12){
  text("Last Fed: " + "12 AM");
 }
}

if(currenttime = lastFed + 1){
garden(); 
gameState.update(playing);
database.ref('/').update({
  gameState:state
})
textSize(2);
text("I think he hid a bone in there..", 230, 150);
}

if(currenttime = lastFed + 2){
washroom();
gameState.update(bathing);
database.ref('/').update({
  gameState:state
})
textSize(2);
text(name + "got a bit dirty, so bathe him.", 230, 150);
}

if(currenttime > lastFed + 2 && currenttime < lastFed + 4){
bedroom();
gameState.update(sleeping);
database.ref('/').update({
  gameState:state
})
textSize(2)
text("Aww, " + name + "tired himself out. Goodnight " + name + " !", 190, 150);
}

if(gameState = 5){
feedButton.hide();
dog = setImage("lying down dog", lyingDog);
textSize(2.5);
text(name + "is hungry! Feed him!", 240, 250);
}

if(keyIsDown(SPACE)){
  openTable();
}

if(keyWentUp(SPACE)){
  closeTable();
}

vaccineButton.mousePressed(giveVaccine()); 

if(gameState === vaccineTime){
  vaccineButton.show();
}

var vaccinationTime= Math.round(frameCount);

if(vaccinationTime = 1000){
  gameState.update(vaccineTime);
  textSize(2)
  text("Its time for " + name + "to get a vaccine! Check the table to see which one you need.");
}

if(vaccinationTime = 3000){
  gameState.update(vaccineTime);
  textSize(2)
  text("Its time for " + name + "to get a vaccine! Check the table to see which one you need.");
}

if(vaccinationTime = 5000){
  gameState.update(vaccineTime);
  textSize(2)
  text("Its time for " + name + "to get a vaccine! Check the table to see which one you need.");
}

if(vaccinationTime = 8000){
  gameState.update(vaccineTime);
  textSize(2)
  text("Its time for " + name + "to get a vaccine! Check the table to see which one you need.");
}

if(vaccinationTime = 12000){
  gameState.update(vaccineTime);
  textSize(2)
  text("Its time for " + name + "to get a vaccine! Check the table to see which one you need.");
}

if(vaccinationTime%5000 === 0 && vaccinationTime > 12000){
  gameState.update(vaccineTime);
  textSize(2)
  text("Its time for " + name + "to get a yearly vaccine! Check the table to see which one you need.");
}

feedButton.mousePressed(feedDoggo());
addMilkButton.mousePressed(addFood());

  Milk.display();

  drawSprites();
}

function readStock(data){
  foodStock = data.val();
}

function writeStock(x){
if (x<=0){
  x=0;
} else {if(x>0){
  x - 1;
}}

database.ref('Food').update({
Food:x
})
} 

function getTime(time){
'Time' = Math.round(frameCount/10);
database.ref('Time').update({
  Time:time
});
}

function addFood() {
database.ref('Food');
foodStock+=1;
database.ref('Food').update();
Milk.index[getFoodStock()].show();
}

function feedDoggo() {
dog = addImage("dog1", dogCrouching_image);
Milk.updateFoodStock(Milk.getFoodStock()-1)
Milk.index[getFoodStock()].hide();
database.ref('/').update();
lastFed = database.ref('Time');
} 

function readGameState(state){
ReadGameState = database.ref('gameState');
ReadGameState.on("value", function(data){
gameState = data.val();
});
}

function update(state){
database.ref('/').update({
  gameState:state
})
}

function currentTime(){
var currenttime = database.ref('/').update({
  Time:time
})  
}

function start(){
 mainTitle.hide();
 title.hide();
 input.hide();
 startButton.hide();
}

function openTable(){
background = setImage("vaccine table", vaccineTable);
dog.hide();
feedButton.hide();
addFoodButton.hide()
Milk.hide();
}

function closeTable(){
  background = setImage("living room", livingRoom_image);
  dog.show();
  feedButton.show();
  addFoodButton.show()
  Milk.show();
  }

function giveVaccine(){
  injection.show(); 
}  

//Ideas
//1-Add vaccination table, and a button to view it, when you press the button rescale the pic to biiiiig, but still have the button for taking it off the screen(keyIsDown function)
//Vaccination stuff, generate randomly, but not a lot
//Annual vaccination, button for it
//Funny scene with the cat getting the injection, text screaming, "UHHHHHHH WRONG ROOM MOVING RIGHT ALONG" and a button to move on from that 
//I loved this project a lot :D 