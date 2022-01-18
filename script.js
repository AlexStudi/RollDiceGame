
// Fonction: Valeur aléatoire arrondie
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Fonction: Visual update 
function setGame(SetGamePlayerIdActive, SetGamePlayerIdInactive) {
  // Background update according to the active player
  var backgroundSetUp = 'background' + SetGamePlayerIdActive;
  var background = document.querySelector ('body');
  background.setAttribute('class', backgroundSetUp);
  // Dot update according to the active player
  var dotPlayerActive = '#dotPlayer' + SetGamePlayerIdActive;
  $(dotPlayerActive).fadeIn('slow');
  var dotPlayerInactive = '#dotPlayer' + SetGamePlayerIdInactive;
  $(dotPlayerInactive).fadeOut('fast');
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

// Variables list (Rappel : var portée de fonction / let portée de bloc)
let diceResult
let playerIdActive = '1' //Joueur actif par défaut en début de partie
let playerIdInactive = '2'
let roundScore = 0
let globalScore = 0
let roundScorePlayer = '#roundScorePlayer' + playerIdActive;
let globalScorePlayer = '#globalScorePlayer' + playerIdActive;

// Click on "Roll dice"
$(() => {

  $('#rollDice').click(function() {

    // Lancé de dé et affichage du dé
    diceResult = getRandomArbitrary(1, 6); // Lancé de dé : réponse aléatoire comprise entre 1 et 6    
    let dicePicture = document.getElementById('diceScore'); // Récupéaration du dé
    dicePicture.setAttribute('src', './images/dice-' + diceResult + '.svg'); // Modification chemin image dé en fonction du lancé de dé
    console.log('Active player juste aprés avoir tiré le dé = ' + playerIdActive)
    // Current set up
    // let roundScorePlayer = '#roundScorePlayer' + playerIdActive;
    // let globalScorePlayer = '#globalScorePlayer' + playerIdActive;

    console.log(roundScorePlayer);// delete
    console.log(globalScorePlayer);// delete

    if (diceResult === 1) {
        roundScore = 0;
        $(roundScorePlayer).html(roundScore);

        console.log('Résultat du dé = 1 Active player = ' + playerIdActive)

        if (playerIdActive === '1'){
          setNextPlayer(playerIdActive); // function
          playerIdActive = '2'
          roundScorePlayer = '#roundScorePlayer' + playerIdActive;
          globalScorePlayer = '#globalScorePlayer' + playerIdActive;
          
          console.log('Résultat du dé = 1 Active player après update = ' + playerIdActive)
        }
        else {
          setNextPlayer(playerIdActive); // function
          playerIdActive = '1'
          roundScorePlayer = '#roundScorePlayer' + playerIdActive;
          globalScorePlayer = '#globalScorePlayer' + playerIdActive;
          
        }

        
      }
    else{
        roundScore = roundScore +  diceResult // Cumul round score
        console.log('roundScore = ' + roundScore)
        $(roundScorePlayer).html(roundScore)
    }    
  })    
});

// Click on "hold"
$(() => {
    $('#holdBt').click(function(){
        globalScore = parseInt($(globalScorePlayer).text()) + roundScore; // Ajout du roundScore au score global du joueur
        $(globalScorePlayer).html(globalScore); // Mise à jour du score global sur page html
        roundScore = 0; //Une fois le score global calculé on peut remettre à 0 le compteur du round
        $(roundScorePlayer).html(roundScore); // Mise à jour du score du round sur page html
        if(globalScore > 99) {console.log('The winner is player ' + playerIdActive)};

        setNextPlayer(playerIdActive); // Mise à jour affichage page html (red dot & grey part)

        // Une fois les scores caclulés, la mise en page réactualisé, il faut modifier le joureur actif car c'est au tour du jour suivant
        if (playerIdActive === '1'){
          playerIdActive = '2';
          playerIdInactive = '1';
          roundScorePlayer = '#roundScorePlayer' + playerIdActive;
          globalScorePlayer = '#globalScorePlayer' + playerIdActive;
        }

        else {
          playerIdActive = '1';
          playerIdInactive = '2';
          roundScorePlayer = '#roundScorePlayer' + playerIdActive;
          globalScorePlayer = '#globalScorePlayer' + playerIdActive;
        }

    })
})



  