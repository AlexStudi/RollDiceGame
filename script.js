// Function: Rounded random value
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Function: Visual update 
function setGame(SetGamePlayerIdActive, SetGamePlayerIdInactive) {
  // Background update according to the active player 1 or 2
  var backgroundSetUp = 'background' + SetGamePlayerIdActive;
  var background = document.querySelector ('body');
  background.setAttribute('class', backgroundSetUp);
  // Dot update according to the active player 1 or 2
  var dotPlayerActive = '#dotPlayer' + SetGamePlayerIdActive;
  $(dotPlayerActive).css('filter','invert(75%) sepia(56%) saturate(6350%) hue-rotate(323deg) brightness(80%) contrast(102%)');
  var dotPlayerInactive = '#dotPlayer' + SetGamePlayerIdInactive;
  $(dotPlayerInactive).css('filter','invert(100%) sepia(100%) saturate(0%) hue-rotate(171deg) brightness(108%) contrast(101%)');
  // Player title update according to the active player 1 or 2
  var playerTitleActive = '#playerTitle' + SetGamePlayerIdActive;
  $(playerTitleActive).css('font-weight', '300');
  var playerTitleInactive = '#playerTitle' + SetGamePlayerIdInactive
  $(playerTitleInactive).css('font-weight', '100');
}

// Fonction: Visual update according to the new active player
// The active player become the inactive one, vice-versa...
function setNextPlayer(SetPlayerIdActive) {
  if (SetPlayerIdActive === '1'){
    setGame('2','1')
  }
  else {
    setGame('1','2')
  }
}

// Function : Hide HOLD (When the score of the round is 0, no need to see the button HOLD)
function hideHold() {
  if(roundScore === 0) {$('#holdBt').hide()} else {$('#holdBt').show()}; // caché bouton hold si scoreRound = 0
}

// Function : Update Active/Inactive player
function ActiveInactivePlayer(){
  if (playerIdActive === '1'){
    playerIdActive = '2';
    playerIdInactive = '1';
  }
  else {
    playerIdActive = '1';
    playerIdInactive = '2';
  }
  roundScorePlayer = '#roundScorePlayer' + playerIdActive;
  globalScorePlayer = '#globalScorePlayer' + playerIdActive;
}

// Variables list
let diceResult
let playerIdActive = '1' //Joueur actif par défaut en début de partie
let playerIdInactive = '2'
let roundScore = 0
let globalScore = 0
let roundScorePlayer = '#roundScorePlayer' + playerIdActive;
let globalScorePlayer = '#globalScorePlayer' + playerIdActive;

$(() => { // Initial configuration
 $('#holdBt').hide();
  setNextPlayer('2');
})

// Click on "Roll dice"
$(() => {
  $('#rollDice').click(function() {

    diceResult = getRandomArbitrary(1, 6); // Dice roll : Rounded random result between 1 & 6    
    let dicePicture = document.getElementById('diceScore'); 
    dicePicture.setAttribute('src', './images/dice-' + diceResult + '.svg'); // dice picture update

    // If dice result = 1
    if (diceResult === 1) {
        roundScore = 0; // The player loose, the round score become 0
        $(roundScorePlayer).html(roundScore); // Update of the round score on the screen (no need to update the global score)
        setNextPlayer(playerIdActive) 
        ActiveInactivePlayer() // Update of the active player
      }

    // If dice result >1
    else{
        roundScore = roundScore +  diceResult // Cumul round score
        $(roundScorePlayer).html(roundScore) // Update of the round score on the screen
        hideHold() // Hide the HOLD buton if not necessary
    }    
  })    
});

// Click on "hold"
$(() => {
    $('#holdBt').click(function(){
        globalScore = parseInt($(globalScorePlayer).text()) + roundScore; // Find the active player global score & add the calculated round score
        $(globalScorePlayer).html(globalScore); // Update of the global score on the screen
        roundScore = 0; // Once the global score updated, put the round score = 0
        $(roundScorePlayer).html(roundScore); // Update of the round score on the screen 

        // If global score => 100 the player win
        if(globalScore > 99) {
          $('#message').html('The winner is player ' + playerIdActive).css('font-size', '2em', 'font-weight', '300', 'color', '#cd4d4c'); // Message
          $('#holdBt').hide(); // Hide button
          $('#rollDice').hide(); // Hide button
        }
        // Screen update for next player
        setNextPlayer(playerIdActive); // Mise à jour affichage page html (red dot & grey part)
        hideHold() // Hide the HOLD buton if not necessary
        
        ActiveInactivePlayer()// Update of the active player
    })
})


