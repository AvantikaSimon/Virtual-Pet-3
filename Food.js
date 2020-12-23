class Milk{
constructor(){
this.index = null;
milk_image = loadImage("images/Milk.png");
}    
getFoodStock(){
var foodStockRef = database.ref('Food');
foodStockRef.on("value", function(data){
foodStock = data.val();
}); 
}    

updateFoodStock(stock){
database.ref('/').this.update({
  foodStock:stock
});
}

display(){
var x = 50;
var y = 101;

imageMode(CENTER);
this.milk = setImage("milk bottle", milk_image);

//if (addMilkButton.mousePressed(function(){
  //new Milk()
  //for(var i = 0; i < this.foodStock; i++){
    //if(i%10 === 0){
    //x = x + 50
    //}
    //if(i%100 === 0){;
    //y = y + 50;
    //}
    //new Milk(x, y, 50, 50);
  //} 
   // }
 // )
//)

if(foodStock >= 0 && addFoodButton.mousePressed())
for (var i = 0; i < 11; i = i + 1){
  'x'.resetX();
  'y'.resetY();
  new Milk('x', 'y', 30, 30);
  x = x + 20;
  database.ref('/').update({
    x: x 
  })
}

if(foodStock > 10 && addFoodButton.mousePressed){
for(var m = 10; m <= foodStock; m = m + 1){
  'x'.reset();
  'y'.resetY();
  new Milk('x', 'y' + 50, 30, 30);
  x = x + 20;
}
}

}
resetX(){
'x' = database.ref('/').update({
   x: 50
})
}

resetY(){
'y' = database.ref('/').update({
  y:150
})   
}

hide(){
  this.hide();
}

show(){
  this.show();
}

bedroom(){
background = setImage("bedroom", bedroom_image); 
}

garden(){
background = setImage("garden", garden_image);
}

washroom(){
background = setImage("washroom", washroom_image);
}

}