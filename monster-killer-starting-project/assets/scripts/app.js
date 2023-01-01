const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let curretMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (curretMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
    } else if (currentPlayerHealth <= 0 && curretMonsterHealth > 0) {
        alert('You lost!');
    } else if (currentPlayerHealth <= 0 && curretMonsterHealth <= 0) {
        alert('You have a draw!');
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    curretMonsterHealth -= damage;
    endRound();

}

function attackHandler() {
    attackMonster('ATTACK');
}
function strongAttackHeadler() {
    attackMonster('STRONG_ATTACK');
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
    endRound();
}

healBtn.addEventListener('click', healPlayerHandler);
strongAttackBtn.addEventListener('click', strongAttackHeadler);
attackBtn.addEventListener('click', attackHandler);