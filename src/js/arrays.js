

//ARRAYS - 


// const videos = [
//     "Pranked my sister",
//     "Indianna Jones",
//     "Love at first sight",
//     "Note-book",
//     "The human mind"
// ]


//------------usinG--FOREACH-------------
// videos.forEach(function(video) {
//     console.log(video);
// });


//------------usinG--MAP-------------

// const newVideos = videos.map(function(video){
//     return video.toUpperCase();
// })

// console.log(newVideos);




//  PROTOTYPE INHERITANCE


function Enemy(life, name, level) {
    this.life = life;
    this.name = name;
    this.level = level;  
  }
  
  Enemy.prototype.getInfo = function () {
    console.log(this.life, this.name, this.level);
  };
  Enemy.prototype.attack = function () {
    console.log(`${this.name} has attacked!`);
  };
  
  Enemy.prototype.block = function (){
    console.log(`${this.name} has blocked`);
  };
  
  // Another constructuor function 
  
  function Dragon(life, name, level, color, spell){
    // to inherit the properties of main constructor function
    //th keyword this is going to reference the Dragon object
    Enemy.call(this, life, name, level);
    //Define it as normal for the other arguements
    this.color = color;
    this.spell = spell;
  }
  
  Dragon.prototype.fireBreath = function() {
    console.log("FIRE BREATHHH");
  }
  
  //Inherit Prototyp
  Dragon.prototype = Object.create(Enemy.prototype);
  
  const newDragon = new Dragon(100, "Dragon", 25, "green", "fire");
  
  console.log(newDragon);




  //////////////////////////////////////////////////////////////////////////////////////

// CLASSES

class Worrior {
    constructor(life, name, level) {
      this.life = life;
      this.name = name;
      this.level = level;
    }
    getInfo() {
      console.log(this.life, this.name, this.level);
    }
  }
  
  const turtle = new Worrior(this.life, this.name, this.level);
  
  const bug = new Worrior(25, 'Squidlebug', 10);
  
  
  turtle.getInfo();