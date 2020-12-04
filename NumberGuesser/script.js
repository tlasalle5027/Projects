let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

/*
* generateTarget generates the target number
* with which the players must guess.
*/
const generateTarget = function(){
    return Math.floor(Math.random() * 9);
}

/*
* getAbsoluteDistance gets the distance between
* guess and target as an absolute number
*/
const getAbsoluteDistance = function(guess, target){
    return Math.abs(target - guess);
}

/*
* compareGuesses checks to see which guess is closest
* to the target number
*/
const compareGuesses = function(humanGuess, compGuess, target){

    const humanDist = getAbsoluteDistance(humanGuess, target);
    const compDist = getAbsoluteDistance(compGuess, target);
    
    if(humanDist < compDist){
        return true;
    } else if(humanDist > compDist){
        return false;
    } else {
        return true;
    }        
    
}

/*
* updateScore updates the winners score
*/
const updateScore = function(winner){
    if(winner === 'human'){
        humanScore++;
    } else {
        computerScore++;
    }
}

/*
* advanceRound advances the round number
*/
const advanceRound = function(){
    currentRoundNumber++;
}