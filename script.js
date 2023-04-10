let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");

const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "stick",
    power: 10
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]


const locations = [
    {
      name: "town square",
      buttonText: ["Go to store", "Go to cave", "Fight the dragon"],
      buttonFunctions: [goStore, goCave,fightDragon],
      text: "You are in town square. You see a sign that says STORE. One that says CAVE PATH. And another one that says DRAGON'S LAIR." 
    },
    {
      name: "store",
      buttonText: ["Buy Health", "Buy Weapon", "Go Back"],
      buttonFunctions: [buyHealth, buyWeapon, goTown],
      text: "You are in the store. What do you want? \n - 10 Health (Price: 10 Gold) \n - Weapon (Price: 30 Gold) \n\n Go back to the Town Square."  
    },
  {
    name: "cave",
    buttonText: ["Fight Slime", "Fight Beast", "Go Back"],
      buttonFunctions: [fightSlime, fightBeast, goTown],
      text: "You entered the cave. There's two monster in front of you! a Slime Creature and a Fanged Beast!"    
  },
  {
    name: "fight",
    buttonText: ["Attack", "Dodge", "Run"],
    buttonFunctions: [attack, dodge, goTown],
    text: "You are fighting a monster"    
  },
  {
    name: "kill monster",
    buttonText: ["Go Back", "Go Back", "Go Back"],
    buttonFunctions: [goTown, goTown, goTown],
    text: "The monsters is dead. You gained experience points and gold"   
  },
  {
    name: "lose",
    buttonText: ["Replay?", "Replay?", "Replay?"],
    buttonFunctions: [restart, restart, restart],
    text: "You are dead."   
  },
  {
    name: "win",
    buttonText: ["Replay?", "Replay?", "Replay?"],
    buttonFunctions: [restart, restart, restart],
    text: "You defeated the dragon! You win the game!"   
  } 
  
  ]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  monsterStats.style.display = "none";
  button1.innerText = location.buttonText[0];
  button2.innerText = location.buttonText[1];
  button3.innerText = location.buttonText[2];
  
  button1.onclick = location.buttonFunctions[0];
  button2.onclick = location.buttonFunctions[1];
  button3.onclick = location.buttonFunctions[2];

  text.innerText = location.text; 
}

function goTown(){
  update(locations[0]);
}

function goStore(){
 update(locations[1])
}

function goCave(){
  update(locations[2]);
}

function buyHealth(){
  if (gold>=10){
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    
  } else {
    text.innerText = "You do not have enough money to buy health..."
  }
  
}

function buyWeapon(){
  if (currentWeapon < weapons.length - 1) {

      if (gold>=30) {

              gold -=30;
              currentWeapon++;
              goldText.innerText = gold;
              let newWeapon = weapons[currentWeapon].name;
              text.innerText = "You now have a " + newWeapon + ".";
              inventory.push(newWeapon);
              text.innerText += "In your inventory you have: " + inventory;    
         } 
         else {
              text.innerText = "You do not have enough money to buy a weapon..."
                 }

  } else {
            text.innerText = "You already have the most powerful weapon!"
            button2.innerText = "Sell weapon for 15 gold";
            button2.onclick = sellWeapon;
          } 
}

function sellWeapon(){
  if (inventory.length > 1){
      gold+=15;
      goldText.innerText = gold;
      let currentWeapon = inventory.shift();
      text.innerText = "You sold your " + currentWeapon + ".";
      text.innerText += "In your inventory you have: " + inventory;
  } 
  else {
      text.innerText = "You can't sell your only weapon";
  }    
}


function fightSlime(){
  fighting = 0; 
  goFight();
}

function fightBeast(){
  fighting = 1; 
  goFight();
}

function fightDragon(){
  fighting = 2; 
  goFight();
}

function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  
  
}
function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) ;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
}

function dodge(){
  text.innerText = "You dodged the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose(){
  update(locations[5]);
}

function winGame(){
  update(locations[6]);
}

function restart()  {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
  

