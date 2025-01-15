let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2'); 
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const locations = [{
  name: "town",
  description: 'You are in the town square. You see a sign that says "Store"',
  buttons: ["Go to store", "Go to cave", "Fight dragon"],
  actions: [goStore, goCave, fightDragon]
}, {
  name: "store",
  description: "You entered the store",
  buttons: ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
  actions: [buyHealth, buyWeapon, goTown]
}, {
  name: "cave",
  description: "You are in a dark cave. You see some monsters",
  buttons: ["Fight Slime", "Fight Beast", "Go to town square"],
  actions: [fightSlime, fightBeast, goTown]
},{
  name: "fight",
  description: "You are fighting a monster",
  buttons: ["Attack", "Dodge", "Run"],
  actions: [attack, dodge, goTown]
},{
  name: "kill monster",
  description: 'The monster screams "Arg!" and falls to the ground. You find some gold and gain some experience',
  buttons: ["Go to Town square", "Go to Town square", "Go to Town square"],
  actions: [goTown, goTown, easterEgg]
},{
  name: "lose",
  description: 'You have died. Game over',
  buttons: ["REPLAY?", "REPLAY?", "REPLAY?"],
  actions: [restart, restart, restart]
},{
  name: "win",
  description: 'You defeated the dragon and saved the kingdom. You win!',
  buttons: ["REPLAY?", "REPLAY?", "REPLAY?"],
  actions: [restart, restart, restart]
},{
  name: "easter egg",
  description: 'You found a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 to 10 . If the number you choose matches one of the randomly numbers, you win!',
  buttons: ["2", "8", "Go to town square?"],
  actions: [pickTwo, pickEight, goTown]
}];

const weapons= [{
    name: "Stick",
    damage: 5
  }, {
    name: "Dagger",
    damage: 30
  }, {
    name: "Claw Hammer",
    damage: 50
  }, {
    name: "Sword",
    damage: 100
}];

const monsters = [{
  name: "Slime",
  level: 2,
  health: 15
},{
  name: "Fanged Beast",
  level: 8,
  health: 60
},{
  name: "Dragon",
  level: 20,
  health: 300
}];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  monsterStats.style.display = "none";
  button1.innerText = location.buttons[0];
  button2.innerText = location.buttons[1];
  button3.innerText = location.buttons[2];

  button1.onclick = location.actions[0];
  button2.onclick = location.actions[1];
  button3.onclick = location.actions[2];
  text.innerText = location.description;
}

function goTown(){
  update(locations[0]);
}

function goStore(){
  update(locations[1]);
}

function goCave(){
  update(locations[2]);
}

function buyHealth(){
  if(gold >= 10){
    health += 10;
    gold -= 10;
    healthText.innerText = health;
    goldText.innerText = gold;
  }else{
    text.innerText = 'Not enough gold to buy health';
  }
}

//To be fixed
function buyWeapon(){
  if(currentWeapon < weapons.length - 1){
    if(gold >= 30){
      gold -= 30;
      goldText.innerText = gold;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon];
      inventory.push(newWeapon.name);
      text.innerText = `Weapon upgraded to "${newWeapon.name}". \nDamage: ${newWeapon.damage}\nInventory: ${inventory}`;
    }else{
      text.innerText = 'Not enough gold to buy weapon';
    }
  }else{
    text.innerText = "You have the best weapon!";
    button2.innerText = "Sell Weapon for 15 gold";
    button2.onclick = sellWeapon;
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

function sellWeapon(){
  if(inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = `You sold your ${currentWeapon} for 15 gold. \nInventory: ${inventory}`;
  }else{
    text.innerText = "You cannot sell your only weapon!";
  }
}

function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack(){
  text.innerText = `Monster damage: ${monsters[fighting].level}.\nYour damage: ${weapons[currentWeapon].damage}`;
  if(isMonsterHit()){
    health -= getMonsterAttackValue(monsters[fighting].level);
  }else{
    text.innerText = `You missed.`;
  }
  
  
  monsterHealth -= weapons[currentWeapon].damage + Math.floor(Math.random()*xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0){
    lose();
  }else if(monsterHealth <= 0){
      fighting === 2? winGame() : defeatMonster();
  }

  if(Math.random() > 0.1 && inventory.length > 1){
    text.innerText += `Your ${inventory.pop()} breaks.`;
    currentWeapon--;
  }
}

function getMonsterAttackValue(level){
  return (level * 5) - Math.floor(Math.random() * xp);
}

function isMonsterHit(){
  return Math.random() > 0.2 || health < 20;
}

function dodge(){
  text.innerText = `You dodged the attack from the ${monsters[fighting].name}.`;

}

function lose(){
  health = 0;
  healthText.innerText = health;
  update(locations[5]);
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  goldText.innerText = gold;
  xp += monsters[fighting].level;
  xpText.innerText = xp;

  update(locations[4]);
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  fighting = null;
  monsterHealth = null;
  inventory = ["Stick"];
  goldText.innerText = gold;
  xpText.innerText = xp;
  healthText.innerText = health;
  update(locations[0]);
}

function winGame(){
  update(locations[6]);
}

function easterEgg(){
  update(locations[7]);
}

function pickTwo(){
  pick(2);
}

function pickEight(){
  pick(8);
}

function pick(n){
  let number = [];

  for(let i = 0; i < 10; i++){
    number.push(Math.floor(Math.random() * 11));
  }

  text.innerText = `You picked ${n}.\nThe numbers are: ${number}.`;

  if(number.indexOf(n) > -1){
    text.innerText += "\nYou win! You get 20 gold";
    gold += 20;
    goldText.innerText = gold;
  }else{
    text.innerText += "\nYou lose! You lose 10 health";
    health -= 10;
    healthText.innerText = health;
    if(health <= 0){
      lose();
    }
  }
}