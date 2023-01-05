const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MOSTER_ATTAC';
const LOG_EVENT_PLAYER_HEALTH = 'PLAYER_HEALTH';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Please, enter a max life points for you and a monster');

let hasBonusLife = true;
let chosenMaxLife = parseInt(enteredValue);
let curretMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
const battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}


adjustHealthBars(chosenMaxLife);

function reset() {
    curretMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}
function writeToAbattleLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        monsterHealth: monsterHealth,
        playerHealth: playerHealth
    }
    if (event === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.targer = 'MONSTER';
    } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry.targer = 'MONSTER';
    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry.targer = 'PLAYER';
    } else if (event === LOG_EVENT_PLAYER_HEALTH) {
        logEntry.targer = 'PLAYER';
    }
    battleLog.push(logEntry);
}

function printLogHandler() {
    console.log(battleLog);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    writeToAbattleLog(
        LOG_EVENT_PLAYER_ATTACK,
        playerDamage,
        curretMonsterHealth,
        currentPlayerHealth
    );


    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert('You would be dead but bonus life saved you!');
        setPlayerHealth(initialPlayerHealth);
    }

    if (curretMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        writeToAbattleLog(
            LOG_EVENT_GAME_OVER,
            'You won!',
            curretMonsterHealth,
            currentPlayerHealth
        );

    } else if (currentPlayerHealth <= 0 && curretMonsterHealth > 0) {
        alert('You lost!');
        writeToAbattleLog(
            LOG_EVENT_GAME_OVER,
            'You lost!',
            curretMonsterHealth,
            currentPlayerHealth
        );

    } else if (currentPlayerHealth <= 0 && curretMonsterHealth <= 0) {
        alert('You have a draw!');
        writeToAbattleLog(
            LOG_EVENT_GAME_OVER,
            'You have a draw!',
            curretMonsterHealth,
            currentPlayerHealth
        );

    }
    if (currentPlayerHealth <= 0 || curretMonsterHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    let eventLog;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        eventLog = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
        eventLog = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(maxDamage);
    curretMonsterHealth -= damage;
    writeToAbattleLog(
        eventLog,
        damage,
        curretMonsterHealth,
        currentPlayerHealth
    )
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHeadler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal more than your initial health");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToAbattleLog(
        LOG_EVENT_PLAYER_HEALTH,
        healValue,
        curretMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

healBtn.addEventListener('click', healPlayerHandler);
strongAttackBtn.addEventListener('click', strongAttackHeadler);
attackBtn.addEventListener('click', attackHandler);
logBtn.addEventListener('click', printLogHandler);