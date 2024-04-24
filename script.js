//#region OBJECTS
function Hero(name, level) {
  this.name = name;
  this.level = level;
}
Hero.prototype.greet = function () {
  playSound("greetSound");
  playerCombatText.classList = "player-combat-text";
  return this.name + " greets " + computerCharacter;
};
Hero.prototype.laugh = function () {
  playSound("laughSound");
  playerCombatText.classList = "player-combat-text";
  return this.name + " laughs at " + computerCharacter;
};
Hero.prototype.cheer = function () {
  playSound("cheerSound");
  playerCombatText.classList = "player-combat-text";
  return this.name + " cheers loudly";
};
function Warrior(name, heroClass, level, weapon, kills) {
  this.name = name;
  this.heroClass = heroClass;
  this.level = level;
  this.weapon = weapon;
  this.kills = kills;
}
Warrior.prototype.attack = function (weapon) {
  if (weapon != "wand")
    return this.name + " swings his " + weapon + " at the " + computerCharacter;
  else
    return this.name + " attacks " + computerCharacter + " with his " + weapon;
};
function Mage(name, heroClass, level, weapon, kills) {
  this.name = name;
  this.heroClass = heroClass;
  this.level = level;
  this.weapon = weapon;
  this.kills = kills;
}
Mage.prototype.attack = function (weapon) {
  if (weapon != "wand")
    return this.name + " swings his " + weapon + " at the" + computerCharacter;
  else
    return this.name + " attacks " + computerCharacter + " with his " + weapon;
};
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Mage.prototype, Hero.prototype);
//#endregion

//#region QUERY SELECTORS
const backgroundPicture = document.querySelector(".background-picture");
const contentArea = document.querySelector(".content");
const headline = document.querySelector("#headline");
const itemCharacterName = document.querySelector(".toolbar-item1");
const itemClass = document.querySelector(".toolbar-item2");
const itemLevel = document.querySelector(".toolbar-item3");
const itemKills = document.querySelector(".toolbar-item4");
const itemExit = document.querySelector(".toolbar-item5");
const btnAttack = document.querySelector(".attack");
const btnGreet = document.querySelector(".greet");
const btnLaugh = document.querySelector(".laugh");
const btnCheer = document.querySelector(".cheer");
const kingImg = document.querySelector("#king");
const warriorImg = document.querySelector("#warrior");
const mageImg = document.querySelector("#mage");
const goblinImg = document.querySelector("#goblin-img");
const nightmareBoyImg = document.querySelector("#nightmareBoy-img");
const werewolfImg = document.querySelector("#werewolf-img");
const griffinImg = document.querySelector("#griffin-img");
const dragonImg = document.querySelector("#dragon-img");
const battleMageImg = document.querySelector("#battle-mage-img");
const axeImage = document.querySelector("#axe");
const swordImage = document.querySelector("#sword");
const wandImage = document.querySelector("#wand");
const weaponTextInput = document.querySelector("#weapon-choice");
const characterForm = document.querySelector("#character-creation-form");
const chest = document.querySelector("#chest");
const welcomeHeading = document.createElement("div");
const welcomeParagraph = document.createElement("div");
const btnPlayAgain = document.createElement("button");
const btnCombatLog = document.createElement("button");
const btnSkipStory = document.createElement("button");
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
const spells = document.querySelector(".spells");
//#endregion

//#region GLOBAL VARIABLES
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
//#endregion

//#region EVENT LISTENERS
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
  tellStory(player.heroClass);
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
  tellStory(player.heroClass);
});
btnNewGame.addEventListener("click", () => {
  window.location.reload();
});
btnCombatLog.addEventListener("click", () => {
  showCombatLog();
});
btnSkipStory.addEventListener("click", () => {
  setUpGame();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "1" && playerTurn) {
    playerCombatText.textContent = player.attack(player.weapon);
    attackComputer();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "2") {
    playerCombatText.style.backgroundColor = "rgb(0,0,0,0.8)";
    playerCombatText.textContent = player.greet();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "3") {
    playerCombatText.style.backgroundColor = "rgb(0,0,0,0.8)";
    playerCombatText.textContent = player.laugh();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "4") {
    playerCombatText.style.backgroundColor = "rgb(0,0,0,0.8)";
    playerCombatText.textContent = player.cheer();
  }
});
//#endregion

//#region FUNCTIONS
function resetBeforeBattle() {
  btnSkipStory.style.display = "none";
  welcomeHeading.classList = "story-heading";
  welcomeParagraph.classList = "story-text";
  playerTurn = false;
  chest.style.display = "none";
  backgroundPicture.classList = "background-picture";
  computerCombatText.style.backgroundColor = "";
  playerCombatText.style.backgroundColor = "";
  warriorImg.classList = "warrior";
  goblinImg.classList = "computer-img";
  nightmareBoyImg.classList = "computer-img";
  werewolfImg.classList = "computer-img";
  griffinImg.classList = "computer-img";
  dragonImg.classList = "computer-img";
  battleMageImg.classList = "computer-img";
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
  spells.style.display = "none";
  messageArea.style.display = "none";
  characterSelectionArea.style.display = "none";
  characterCreationArea.style.display = "none";
  btnCombatLog.style.display = "none";
}
function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.play();
  if (soundId === "musicSound") sound.volume = 0.5;
}
function stopSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.pause();
}
function startGame() {
  resetBeforeBattle();
  displayWelcomeMessage();
}
function displayWelcomeMessage() {
  messageArea.style.display = "";
  headline.style.display = "";
  welcomeHeading.textContent = "Welcome to Tarrida Village!";
  welcomeParagraph.innerHTML =
    "The village was robbed! Someone has to get the gold back!<br><br>Who will take on this quest, and will they succeed?";
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
  itemKills.textContent = "Kills: " + player.kills;
  messageArea.style.display = "none";
  btnSkipStory.style.display = "none";
  characterSelectionArea.style.display = "none";
  characterCreationArea.style.display = "none";
  battleField.style.display = "";
  btnBattle.style.display = "";
  insertCharacters();
}
function insertCharacters() {
  headline.style.display = "none";
  if (player.heroClass === "Warrior") {
    warriorImg.classList = "character-placement";
    battleField.appendChild(warriorImg);
  } else if (player.heroClass === "Mage") {
    mageImg.classList = "character-placement";
    battleField.appendChild(mageImg);
  }
  if (player.kills === 0) {
    computerCharacter = "Goblin";
    backgroundPicture.style.backgroundImage = `url("./img/woods.jpg")`;
    backgroundPicture.classList =
      "background-picture background-picture-bottom";
    goblinImg.style.display = "";
    nightmareBoyImg.style.display = "none";
    werewolfImg.style.display = "none";
    griffinImg.style.display = "none";
    dragonImg.style.display = "none";
    battleMageImg.style.display = "none";
  } else if (player.kills === 1) {
    computerCharacter = "Nightmare";
    backgroundPicture.style.backgroundImage = `url("./img/nightmareWoods.jpg")`;
    backgroundPicture.classList = "background-picture";
    nightmareBoyImg.style.display = "";
    goblinImg.style.display = "none";
    werewolfImg.style.display = "none";
    griffinImg.style.display = "none";
    dragonImg.style.display = "none";
    battleMageImg.style.display = "none";
  } else if (player.kills === 2) {
    computerCharacter = "Werewolf";
    backgroundPicture.style.backgroundImage = `url("./img/moonWoods.jpg")`;
    werewolfImg.style.display = "";
    goblinImg.style.display = "none";
    nightmareBoyImg.style.display = "none";
    griffinImg.style.display = "none";
    dragonImg.style.display = "none";
    battleMageImg.style.display = "none";
  } else if (player.kills === 3) {
    computerCharacter = "Griffin";
    backgroundPicture.style.backgroundImage = `url("./img/openField.jpg")`;
    griffinImg.style.display = "";
    werewolfImg.style.display = "none";
    goblinImg.style.display = "none";
    nightmareBoyImg.style.display = "none";
    dragonImg.style.display = "none";
    battleMageImg.style.display = "none";
  } else if (player.kills === 4) {
    computerCharacter = "Dragon";
    backgroundPicture.style.backgroundImage = `url("./img/outsideCastle.jpg")`;
    dragonImg.style.display = "";
    werewolfImg.style.display = "none";
    goblinImg.style.display = "none";
    nightmareBoyImg.style.display = "none";
    griffinImg.style.display = "none";
    battleMageImg.style.display = "none";
  } else if (player.kills === 5) {
    computerCharacter = "Battle-mage";
    battleMageImg.style.display = "";
    backgroundPicture.style.backgroundImage = `url("./img/insideCastle.avif")`;
    werewolfImg.style.display = "none";
    goblinImg.style.display = "none";
    nightmareBoyImg.style.display = "none";
    griffinImg.style.display = "none";
    dragonImg.style.display = "none";
  }
}
function startBattle() {
  playSound("musicSound");
  playerTurn = true;
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
  spells.style.display = status;
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
  if (weapon === "fists") {
    baseDamage = 6;
    critChance = 0.5;
  } else if (weapon === "axe") {
    baseDamage = 10;
    critChance = 0.3;
  } else if (weapon === "sword") {
    baseDamage = 13;
    critChance = 0.2;
  } else if (weapon === "wand") {
    baseDamage = 200;
    critChance = 0.15;
  } else if (weapon === "Goblin") {
    baseDamage = 12;
    critChance = 0.05;
  } else if (weapon === "Nightmare") {
    baseDamage = 13;
    critChance = 0.1;
  } else if (weapon === "Werewolf") {
    baseDamage = 14;
    critChance = 0.15;
  } else if (weapon === "Griffin") {
    baseDamage = 15;
    critChance = 0.18;
  } else if (weapon === "Dragon") {
    baseDamage = 16;
    critChance = 0.2;
  } else if (weapon === "Battle-mage") {
    baseDamage = 17;
    critChance = 0.3;
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
function playSoundEffect(effect) {
  if (effect === "fists" || effect === "Nightmare") {
    playSound("punchSound");
  } else if (effect === "axe") {
    playSound("axeSound");
  } else if (effect === "sword" || effect === "Goblin") {
    playSound("swordSound");
  } else if (effect === "wand") {
    playSound("wandSound");
  } else if (effect === "victory") {
    playSound("victorySound");
  } else if (effect === "levelUp") {
    playSound("levelUpSound");
  } else if (effect === "Battle-mage") {
    playSound("bigSwordSound");
  } else if (effect === "died") {
    playSound("diedSound");
  } else if (effect === "greet") {
    playSound("greetSound");
  } else if (effect === "cheer") {
    playSound("cheerSound");
  } else if (effect === "laugh") {
    playSound("laughSound");
  } else playSound("clawSound");
}
function attackComputer() {
  playSoundEffect(player.weapon);
  playerCombatText.classList = "player-combat-text";
  playerCombatText.style.backgroundColor = "rgb(0,0,0,0.8)";
  computerCombatText.style.backgroundColor = "";
  playerTurn = false;
  computerCurrentHealth = parseFloat(
    computerHealthBarInner.style.width.slice(0, 3)
  );
  let attackDamage =
    calculateAttackDamage(player.weapon).toFixed(1) + player.level;
  let computerNewHealth = computerCurrentHealth - attackDamage;
  computerHealthBarInner.style.width = computerNewHealth + "%";

  computerHealthNumbers.textContent =
    parseFloat(computerHealthBarInner.style.width.slice(0, 4)) + "/100";
  computerCombatText.classList = "red-font computer-combat-text";
  computerCombatText.textContent = attackDamage;

  if (crit)
    computerCombatLog.innerHTML +=
      "<br>Was crit for " + attackDamage + " damage";
  else
    computerCombatLog.innerHTML +=
      "<br>Was hit for " + attackDamage + " damage";

  if (attackDamage > computerCurrentHealth) {
    computerHealthBarInner.style.width = "0%";
    computerHealthNumbers.textContent = "0/100";
    computerCombatLog.innerHTML += "<br>Died";
    battleOver("player");
    return;
  }
  crit = false;
  setTimeout(() => {
    attackPlayer();
  }, 3000);
}
function attackPlayer() {
  playSoundEffect(computerCharacter);
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
    playerCombatLog.innerHTML += "<br>Was crit for " + attackDamage + " damage";
  else
    playerCombatLog.innerHTML += "<br>Was hit for " + attackDamage + " damage";

  if (attackDamage > playerCurrentHealth) {
    playerHealthBarInner.style.width = "0%";
    playerHealthNumbers.textContent = "0/100";
    playerCombatLog.innerHTML += "<br>Died";
    battleOver("computer");
  }
  crit = false;
  playerTurn = true;
}
function battleOver(winner) {
  if (winner !== "player") {
    warriorImg.classList = "dead character-placement";
    mageImg.classList = "dead character-placement";
    playerTurn = false;
    playSoundEffect("died");
    stopSound("musicSound");
  } else {
    goblinImg.classList = "dead computer-img";
    nightmareBoyImg.classList = "dead computer-img";
    werewolfImg.classList = "dead computer-img";
    battleMageImg.classList = "dead computer-img";
    if (computerCharacter === "Griffin" || computerCharacter === "Dragon") {
      griffinImg.classList = "dead180 computer-img";
      dragonImg.classList = "dead180 computer-img";
    }
    if (computerCharacter !== "Battle-mage") {
      playSoundEffect("levelUp");
    }
  }
  setTimeout(() => {
    setBattleBarsStatus("off");
    displayBattleOverMessage(winner);
  }, 2000);
}
function displayBattleOverMessage(winner) {
  playerTurn = false;
  if (winner === "player" && computerCharacter === "Battle-mage") {
    getReward();
    return;
  }
  if (winner === "player") {
    player.kills++;
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
function getReward() {
  stopSound("musicSound");
  playSoundEffect("victory");
  gameOver();
}
function gameOver() {
  player.kills++;
  player.level++;
  messageArea.style.display = "";
  chest.style.display = "";
  welcomeHeading.textContent = "You found the treasure!";
  welcomeParagraph.innerHTML =
    "<br>The king will be very happy.<br><br> Hurry back!";
  btnPlayAgain.classList = "play-again-button";
  btnPlayAgain.textContent = "Continue";
  btnPlayAgain.style.display = "";
  messageArea.appendChild(btnPlayAgain);
  btnCombatLog.classList = "play-again-button";
  btnCombatLog.textContent = "Combat log";
  btnCombatLog.style.display = "";
  messageArea.appendChild(btnCombatLog);
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

  // if (computerCharacter === "Battle-mage") {
  //   btnNewGame.classList = "button-new-game";
  //   btnNewGame.textContent = "New Game";
  //   messageArea.appendChild(btnNewGame);
  // }
}
function tellStory(hero) {
  headline.style.display = "none";
  characterCreationArea.style.display = "none";
  messageArea.style.display = "";
  if (player.level === 1) {
    welcomeHeading.textContent = "Chapter 1";
    welcomeParagraph.innerHTML =
      "The " +
      hero +
      " answered Tarrida's call to action and set out to retrieve the stolen treasure.<br><br>After a while on the sandy gravel road, outside the village, he saw some broken branches by the woods. The " +
      hero +
      " found it interesting and entered through the opening into the dense green paradise.<br><br>As morning broke into mid-day, with the sun straight above the trees, the " +
      hero +
      " spotted a green creature that didn't belong in the natural fauna of the woods.<br><br>The " +
      hero +
      " walked towards it and broke a few sticks, which drew the creature's attention...";
  } else if (player.level === 2) {
    backgroundPicture.style.backgroundImage =
      "linear-gradient(0deg, rgb(0, 0, 0), rgb(27, 2, 35))";
    welcomeHeading.textContent = "Chapter 2";
    welcomeParagraph.innerHTML =
      "After the intense fight with the green creature the " +
      hero +
      " got so tired and fell asleep behind a bush by a big tree.<br><br>While the " +
      hero +
      " was sleeping peacefully with songs of birds and gentle winds in the background, he's dreams started going darker.<br><br>The " +
      hero +
      "'s vision inside the dream got more and more enshrouded with fog and darkness. A strong black silhouette emerged and drew closer and closer in front of the " +
      hero +
      "'s mental vision.<br><br>The " +
      hero +
      "'s heart raced faster and faster as the shadow got closer and closer. He finally woke up, only to see the unreal...";
  } else if (player.level === 3) {
    backgroundPicture.style.backgroundImage =
      "linear-gradient(0deg, rgb(0, 0, 0), rgb(27, 2, 35))";
    welcomeHeading.textContent = "Chapter 3";
    welcomeParagraph.innerHTML =
      "The " +
      hero +
      " answered Tarrida's call to action and set out to retrieve the stolen treasure.<br><br>After a while on the sandy gravel road outside the city he saw some broken branches by the woods. The " +
      hero +
      " found it interesting and entered through the opening into the dense green paradise.<br><br>As morning broke into mid-day with the sun straight above the trees the " +
      hero +
      " spotted a green creature that didn't belong in the natural fauna of the woods.<br><br>The " +
      hero +
      " accelerated towards it and drew it's attention...";
  } else if (player.level === 4) {
    backgroundPicture.style.backgroundImage =
      "linear-gradient(0deg, rgb(0, 0, 0), rgb(27, 2, 35))";
    welcomeHeading.textContent = "Chapter 4";
    welcomeParagraph.innerHTML =
      "The " +
      hero +
      " answered Tarrida's call to action and set out to retrieve the stolen treasure.<br><br>After a while on the sandy gravel road outside the city he saw some broken branches by the woods. The " +
      hero +
      " found it interesting and entered through the opening into the dense green paradise.<br><br>As morning broke into mid-day with the sun straight above the trees the " +
      hero +
      " spotted a green creature that didn't belong in the natural fauna of the woods.<br><br>The " +
      hero +
      " accelerated towards it and drew it's attention...";
  } else if (player.level === 5) {
    backgroundPicture.style.backgroundImage =
      "linear-gradient(0deg, rgb(0, 0, 0), rgb(27, 2, 35))";
    welcomeHeading.textContent = "Chapter 5";
    welcomeParagraph.innerHTML =
      "The " +
      hero +
      " answered Tarrida's call to action and set out to retrieve the stolen treasure.<br><br>After a while on the sandy gravel road outside the city he saw some broken branches by the woods. The " +
      hero +
      " found it interesting and entered through the opening into the dense green paradise.<br><br>As morning broke into mid-day with the sun straight above the trees the " +
      hero +
      " spotted a green creature that didn't belong in the natural fauna of the woods.<br><br>The " +
      hero +
      " accelerated towards it and drew it's attention...";
  } else if (player.level === 6) {
    backgroundPicture.style.backgroundImage =
      "linear-gradient(0deg, rgb(0, 0, 0), rgb(27, 2, 35))";
    welcomeHeading.textContent = "Chapter 6";
    welcomeParagraph.innerHTML =
      "The " +
      hero +
      " answered Tarrida's call to action and set out to retrieve the stolen treasure.<br><br>After a while on the sandy gravel road outside the city he saw some broken branches by the woods. The " +
      hero +
      " found it interesting and entered through the opening into the dense green paradise.<br><br>As morning broke into mid-day with the sun straight above the trees the " +
      hero +
      " spotted a green creature that didn't belong in the natural fauna of the woods.<br><br>The " +
      hero +
      " accelerated towards it and drew it's attention...";
  } else if (player.level === 7) {
    backgroundPicture.style.backgroundImage = 'url("./img/town.avif")';
    kingImg.classList = "place-king-ending";
    messageArea.classList += " message-area-ending";
    chest.style.display = "";
    chest.classList = "place-chest-ending";
    contentArea.appendChild(chest);
    playSound("applauseSound");

    if (player.heroClass === "Warrior") {
      warriorImg.style.display = "";
      warriorImg.classList = " place-hero-ending";
      contentArea.appendChild(warriorImg);
    } else if (player.heroClass === "Mage") {
      mageImg.style.display = "";
      mageImg.classList = " place-hero-ending";
      contentArea.appendChild(mageImg);
    }

    welcomeHeading.textContent = "Chapter 7";
    welcomeParagraph.innerHTML =
      "The " +
      hero +
      " returned back home to Tarrida Village with a small subtle smile and a big treasure chest.<br><br> The king and the whole village cheered for the " +
      hero +
      "'s safe return with himself and the gold. The king promised him a feast and celebration in the king's hall the next day.<br><br>...but for now the " +
      hero +
      "was sweaty and tired with a strong desire for a bath and a soft bed.<br><br>THE END";
  }
  if (player.level === 7) {
    btnNewGame.style.display = "";
    btnNewGame.classList = "button-new-game new-game-button-ending";
    btnNewGame.textContent = "New Game";
    welcomeParagraph.appendChild(btnNewGame);
  } else {
    messageArea.appendChild(welcomeHeading);
    messageArea.appendChild(welcomeParagraph);
    btnSkipStory.classList = "button-skip-story";
    btnSkipStory.textContent = "Skip";
    btnSkipStory.style.display = "";
    messageArea.appendChild(btnSkipStory);
  }
}
//#endregion

// INITIALIZING OF THE PROGRAM-----------------------------
startGame();
