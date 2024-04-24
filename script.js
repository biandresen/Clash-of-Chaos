// OBJECT AND METHOD DECLARATION--------------------
function Hero(name, level) {
  this.name = name;
  this.level = level;
}
Hero.prototype.greet = function () {
  return this.name + " greets " + computerCharacter + " with a hearty hello";
};
Hero.prototype.bow = function () {
  return this.name + " bows down at " + computerCharacter + "'s feet";
};
Hero.prototype.cheer = function () {
  return this.name + " cheers loudly";
};
function Warrior(name, heroClass, level, weapon, score) {
  this.name = name;
  this.heroClass = heroClass;
  this.level = level;
  this.weapon = weapon;
  this.score = score;
}
Warrior.prototype.attack = function (weapon) {
  if (weapon != "wand")
    return this.name + " swings his " + weapon + " at the " + computerCharacter;
  else
    return this.name + " attacks " + computerCharacter + " with his " + weapon;
};
function Mage(name, heroClass, level, weapon, score) {
  this.name = name;
  this.heroClass = heroClass;
  this.level = level;
  this.weapon = weapon;
  this.score = score;
}
Mage.prototype.attack = function (weapon) {
  if (weapon != "wand")
    return this.name + " swings his " + weapon + " at the" + computerCharacter;
  else
    return this.name + " attacks " + computerCharacter + " with his " + weapon;
};
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Mage.prototype, Hero.prototype);
// QUERY SELECTORS AND ELEMENT CREATION--------------------
const itemCharacterName = document.querySelector(".toolbar-item1");
const itemClass = document.querySelector(".toolbar-item2");
const itemLevel = document.querySelector(".toolbar-item3");
const itemScore = document.querySelector(".toolbar-item4");
const itemExit = document.querySelector(".toolbar-item5");
const btnAttack = document.querySelector(".melee-attack");
const btnRangedAttack = document.querySelector(".ranged-attack");
const btnGreet = document.querySelector(".greet");
const btnBow = document.querySelector(".bow");
const btnCheer = document.querySelector(".cheer");
const warriorImg = document.querySelector("#warrior");
const mageImg = document.querySelector("#mage");
const battleMageImg = document.querySelector(".battle-mage-img");
const werewolfImg = document.querySelector(".werewolf-img");
const axeImage = document.querySelector("#axe");
const swordImage = document.querySelector("#sword");
const wandImage = document.querySelector("#wand");
const weaponTextInput = document.querySelector("#weapon-choice");
const characterForm = document.querySelector("#character-creation-form");
const welcomeHeading = document.createElement("div");
const welcomeParagraph = document.createElement("div");
const btnPlayAgain = document.createElement("button");
const btnCombatLog = document.createElement("button");
const btnNewGame = document.createElement("button");
const btnReset = document.querySelector(".toolbar-item5");
const characterCreationName = document.querySelector(
  ".character-creation-name"
);
const btnBattle = document.querySelector("#battle-button");
const playerHealthNumbers = document.querySelector(".player-health-numbers");
const computerHealthNumbers = document.querySelector(
  ".computer-health-numbers"
);
const playerCombatText = document.querySelector(".player-combat-text");
const playerCombatLog = document.querySelector(".player-combat-log");
const computerCombatText = document.querySelector(".computer-combat-text");
const computerCombatLog = document.querySelector(".computer-combat-log");
const playerHealthBarInner = document.querySelector(".player-health-bar-inner");
const computerHealthBarInner = document.querySelector(
  ".computer-health-bar-inner"
);
const playerHealthBarOuter = document.querySelector(".player-health-bar-outer");
const computerHealthBarOuter = document.querySelector(
  ".computer-health-bar-outer"
);
const messageArea = document.querySelector(".message-area");
const characterSelectionArea = document.querySelector(
  ".character-selection-area"
);
const characterCreationArea = document.querySelector(
  ".character-creation-area"
);
const characterCreationImage = document.querySelector(
  ".character-creation-image"
);
const battleField = document.querySelector(".battle-field");
const spellBar = document.querySelector(".spellbar");
// GLOBAL VARIABLE DECLARATION----------------------------
let computerCharacter = "";
let chosenCharacter = false;
let playerTurn;
let crit = false;
let playerTimesCrit = 0;
let playerTimesAttack = 0;
let computerTimesCrit = 0;
let computerTimesAttack = 0;
let playerCurrentHealth;
let computerCurrentHealth;
//------------------------------------------------------
//------------------------------------------------------
// EVENT LISTENERS---------------------------------------
warriorImg.addEventListener("click", () => {
  if (chosenCharacter === false) createCharacter("Warrior");
});
mageImg.addEventListener("click", () => {
  if (chosenCharacter === false) createCharacter("Mage");
});
axeImage.addEventListener("click", function () {
  weaponTextInput.value = "axe";
});
swordImage.addEventListener("click", function () {
  weaponTextInput.value = "sword";
});
wandImage.addEventListener("click", function () {
  weaponTextInput.value = "wand";
});
btnBattle.addEventListener("click", function () {
  startBattle();
});
characterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  player.name = document.querySelector("#name").value;
  player.weapon = document.querySelector("#weapon-choice").value;
  setUpGame();
});
btnReset.addEventListener("click", () => {
  window.location.reload();
});
btnAttack.addEventListener("click", function () {
  if (playerTurn) {
    playerCombatText.textContent = player.attack(player.weapon);
    attackComputer();
  }
});
btnPlayAgain.addEventListener("click", () => {
  resetBeforeBattle();
  setUpGame();
});
btnNewGame.addEventListener("click", () => {
  window.location.reload();
});
btnCombatLog.addEventListener("click", () => {
  showCombatLog();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "1" && playerTurn) {
    playerCombatText.textContent = player.attack(player.weapon);
    attackComputer();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "2") {
    playerCombatText.style.backgroundColor = "rgb(0,0,0,0.8";
    playerCombatText.textContent = player.greet();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "3") {
    playerCombatText.style.backgroundColor = "rgb(0,0,0,0.8";
    playerCombatText.textContent = player.bow();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "4") {
    playerCombatText.style.backgroundColor = "rgb(0,0,0,0.8";
    playerCombatText.textContent = player.cheer();
  }
});
// FUNCTIONS--------------------------------------------------
function resetBeforeBattle() {
  playerTurn = true;
  computerCombatText.style.backgroundColor = "";
  warriorImg.classList = "warrior";
  werewolfImg.classList = "werewolf-img";
  battleMageImg.classList = "battle-mage-img";
  playerCombatText.classList = "player-combat-text";
  computerCombatText.classList = "computer-combat-text";
  computerCombatLog.innerHTML = "";
  computerCombatText.textContent = "";
  playerCombatText.textContent = "";
  playerCombatLog.innerHTML = "";
  playerHealthNumbers.textContent = "100/100";
  computerHealthNumbers.textContent = "100/100";
  playerHealthNumbers.style.display = "none";
  computerHealthNumbers.style.display = "none";
  computerHealthBarInner.style.width = "100%";
  playerHealthBarInner.style.width = "100%";
  playerHealthBarOuter.style.display = "none";
  computerHealthBarOuter.style.display = "none";
  playerCombatText.style.display = "none";
  playerCombatLog.style.display = "none";
  computerCombatText.style.display = "none";
  computerCombatLog.style.display = "none";
  btnBattle.style.display = "none";
  btnPlayAgain.style.display = "none";
  battleField.style.display = "none";
  spellBar.style.display = "none";
  messageArea.style.display = "none";
  characterSelectionArea.style.display = "none";
  characterCreationArea.style.display = "none";
  btnCombatLog.style.display = "none";
}
function startGame() {
  resetBeforeBattle();
  displayWelcomeMessage();
}
function displayWelcomeMessage() {
  messageArea.style.display = "";
  welcomeHeading.textContent = "Welcome to the Clash of Chaos!";
  welcomeParagraph.textContent =
    "Choose your class, give them a name and choose a weapon";
  messageArea.appendChild(welcomeHeading);
  messageArea.appendChild(welcomeParagraph);
  characterSelectionArea.style.display = "";
}
function setCharacterChoice() {
  messageArea.style.display = "none";
  characterSelectionArea.style.display = "none";
  characterCreationArea.style.display = "";
  characterCreationName.textContent = player.heroClass;
  if (player.heroClass === "Warrior")
    characterCreationImage.appendChild(warriorImg);
  else characterCreationImage.appendChild(mageImg);
}
function createCharacter(classChoice) {
  chosenCharacter = true;
  if (classChoice === "Warrior") {
    player = new Warrior("", "Warrior", 1, "", 0);
  }
  if (classChoice === "Mage") {
    player = new Mage("", "Mage", 1, "", 0);
  }
  setCharacterChoice();
}
function setUpGame() {
  itemCharacterName.textContent = "Name: " + player.name;
  itemClass.textContent = "Class: " + player.heroClass;
  itemLevel.textContent = "Level: " + player.level;
  itemScore.textContent = "Score: " + player.score;
  messageArea.style.display = "none";
  characterSelectionArea.style.display = "none";
  characterCreationArea.style.display = "none";
  battleField.style.display = "";
  btnBattle.style.display = "";
  insertCharacters();
}
function insertCharacters() {
  if (player.heroClass === "Warrior") {
    warriorImg.classList = "character-placement";
    battleField.appendChild(warriorImg);
  } else if (player.heroClass === "Mage") {
    mageImg.classList = "character-placement";
    battleField.appendChild(mageImg);
  }
  if (player.score === 0) {
    computerCharacter = "Werewolf";
    werewolfImg.style.display = "";
    battleMageImg.style.display = "none";
  } else if (player.score === 1) {
    computerCharacter = "Battle-mage";
    werewolfImg.style.display = "none";
    battleMageImg.style.display = "";
  } else if (player.score === 2) {
    computerCharacter = "Battle-mage";
    werewolfImg.style.display = "none";
    battleMageImg.style.display = "";
  }
}
function startBattle() {
  playerTimesCrit = 0;
  playerTimesAttack = 0;
  computerTimesCrit = 0;
  computerTimesAttack = 0;
  setBattleBarsStatus("on");
  btnBattle.style.display = "none";
}
function setBattleBarsStatus(set) {
  let status;
  if (set === "on") status = "";
  else status = "none";
  playerHealthNumbers.style.display = status;
  computerHealthNumbers.style.display = status;
  spellBar.style.display = status;
  playerHealthBarOuter.style.display = status;
  computerHealthBarOuter.style.display = status;
  playerCombatText.style.display = status;
  playerCombatLog.style.display = status;
  computerCombatText.style.display = status;
  computerCombatLog.style.display = status;
}
function calculateAttackDamage(weapon) {
  let damage;
  let baseDamage;
  let critChance;
  if (weapon === "axe") {
    baseDamage = 10;
    critChance = 0.3;
  } else if (weapon === "sword") {
    baseDamage = 15;
    critChance = 0.2;
  } else if (weapon === "wand") {
    baseDamage = 20;
    critChance = 0.15;
  } else if (weapon === "Werewolf") {
    baseDamage = 80;
    critChance = 0.5;
  } else if (weapon === "Battle-mage") {
    baseDamage = 25;
    critChance = 0.1;
  }

  let totalCritChance = Math.random() + critChance;
  if (totalCritChance > 1.0) crit = true;
  if (crit) {
    damage = baseDamage * 2;
    if (weapon === "axe" || weapon === "sword" || weapon === "wand") {
      playerTimesCrit++;
    } else computerTimesCrit++;
  } else damage = baseDamage + totalCritChance;

  if (weapon === "axe" || weapon === "sword" || weapon === "wand") {
    playerTimesAttack++;
  } else computerTimesAttack++;

  return damage;
}
function attackComputer() {
  playerCombatText.classList = "player-combat-text";
  playerCombatText.style.backgroundColor = "rgb(0,0,0,0.8)";
  computerCombatText.style.backgroundColor = "";
  playerTurn = false;
  computerCurrentHealth = parseFloat(
    computerHealthBarInner.style.width.slice(0, 3)
  );
  let attackDamage = calculateAttackDamage(player.weapon).toFixed(1);
  let computerNewHealth = computerCurrentHealth - attackDamage;
  computerHealthBarInner.style.width = computerNewHealth + "%";

  computerHealthNumbers.textContent =
    parseFloat(computerHealthBarInner.style.width.slice(0, 4)) + "/100";
  computerCombatText.classList = "red-font computer-combat-text";
  computerCombatText.textContent = attackDamage;

  if (crit)
    computerCombatLog.innerHTML +=
      "<br>Hit with a critical strike for " + attackDamage + " damage";
  else
    computerCombatLog.innerHTML +=
      "<br>Hit with a normal strike for " + attackDamage + " damage";

  if (attackDamage > computerCurrentHealth) {
    computerHealthBarInner.style.width = "0%";
    computerHealthNumbers.textContent = "0/100";
    computerCombatLog.innerHTML += "<br>Died";
    winningDisplay("player");
    return;
  }
  crit = false;
  setTimeout(() => {
    attackPlayer();
  }, 3000);
}
function attackPlayer() {
  computerCombatText.classList = "computer-combat-text";
  playerCombatText.style.backgroundColor = "";
  computerCombatText.style.backgroundColor = "rgb(0,0,0,0.8)";
  computerCombatText.textContent = computerCharacter + " hits " + player.name;
  playerCurrentHealth = parseFloat(
    playerHealthBarInner.style.width.slice(0, 3)
  );
  let attackDamage = calculateAttackDamage(computerCharacter).toFixed(1);
  let playerNewHealth = playerCurrentHealth - attackDamage;
  playerHealthBarInner.style.width = playerNewHealth + "%";

  playerHealthNumbers.textContent =
    parseFloat(playerHealthBarInner.style.width.slice(0, 4)) + "/100";
  playerCombatText.classList = "red-font player-combat-text";
  playerCombatText.textContent = attackDamage;

  if (crit)
    playerCombatLog.innerHTML +=
      "<br>Hit with a critical strike for " + attackDamage + " damage";
  else
    playerCombatLog.innerHTML +=
      "<br>Hit with a normal strike for " + attackDamage + " damage";

  if (attackDamage > playerCurrentHealth) {
    playerHealthBarInner.style.width = "0%";
    playerHealthNumbers.textContent = "0/100";
    playerCombatLog.innerHTML += "<br>Died";
    winningDisplay("computer");
  }
  crit = false;
  playerTurn = true;
}
function winningDisplay(winner) {
  if (winner !== "player") {
    warriorImg.classList = "dead character-placement";
    mageImg.classList = "dead character-placement";
  } else {
    werewolfImg.classList = "dead werewolf-img";
    battleMageImg.classList = "dead battle-mage-img";
  }

  setTimeout(() => {
    setBattleBarsStatus("off");
    displayBattleOverMessage(winner);
  }, 1000);
}
function displayBattleOverMessage(winner) {
  if (winner === "player") {
    player.score++;
    player.level++;
    messageArea.style.display = "";
    btnPlayAgain.style.display = "";
    welcomeHeading.textContent = "You won the battle!";
    welcomeParagraph.textContent =
      "Do you want to play against the next challenger?";
    btnPlayAgain.classList = "play-again-button";
    btnPlayAgain.textContent = "Next battle";
    messageArea.appendChild(btnPlayAgain);
    btnCombatLog.classList = "play-again-button";
    btnCombatLog.textContent = "Combat log";
    btnCombatLog.style.display = "";
    messageArea.appendChild(btnCombatLog);
  } else {
    messageArea.style.display = "";
    btnPlayAgain.style.display = "";
    welcomeHeading.textContent = "You lost!";
    welcomeParagraph.textContent = "Do you want to play again? ";
    btnNewGame.classList = "button-new-game";
    btnNewGame.textContent = "New Game";
    messageArea.appendChild(btnNewGame);
    btnPlayAgain.classList = "play-again-button";
    btnPlayAgain.textContent = "Try again";
    messageArea.appendChild(btnPlayAgain);
    btnCombatLog.classList = "play-again-button";
    btnCombatLog.textContent = "Combat log";
    btnCombatLog.style.display = "";
    messageArea.appendChild(btnCombatLog);
  }
}
function showCombatLog() {
  btnCombatLog.style.display = "none";
  welcomeHeading.textContent = "Combat log";
  welcomeHeading.style.fontSize = "3rem";
  welcomeParagraph.innerHTML =
    "<br>" +
    player.name +
    ":<br>" +
    playerTimesAttack +
    " normal hits<br>" +
    playerTimesCrit +
    " critical hits<br><br>" +
    computerCharacter +
    ":<br>" +
    computerTimesAttack +
    " normal hits<br>" +
    computerTimesCrit +
    " critical hits.";
}

// INITIALIZING OF THE PROGRAM-----------------------------
startGame();
