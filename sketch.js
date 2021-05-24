var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed
var lastFedTime


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed Your Dog");
  feed.position(650, 95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
  var lastFedref = database.ref('FeedTime')
  lastFedref.on("value", function(data)
  {lastFedTime = data.val()
  })

}

function draw() {
  background(46,139,87);
  foodObj.display();

  
  
  //function to read food Stock
  
  
 

  //write code to display text lastFed time here
  fill("white")
  textSize(15)
 
if(lastFedTime === 0){
  text("Last fed: 12 AM", 340, 26)
}

else if(lastFedTime > 12){
  text("Last fed: " + lastFedTime%12+" PM", 340, 26)
  
}
else{
  text("Last fed: " + lastFedTime+" AM", 340, 26)
}
  
 

 
  drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happyDog);
  lastFedTime = hour() //
 
  //write code here to update food stock and last fed time
  foodS = foodS - 1
  database.ref('/').update({
   
    Food:foodS
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
