document.addEventListener("DOMContentLoaded", function() {
    const array =[];
    const board = document.querySelector('#cards'); 
    const cards = document.querySelectorAll('.flip-card');
    const startBtn = document.querySelector('.start-game');
    const cardNumber = 20;
    let score = 0;
    let cardOne = null;
    let cardTwo = null;
    let pairTotal = 0;
    let lowScore = document.querySelector('#low-score');
    lowScore.innerText = localStorage.getItem('lowScore') || 0;
    
    startBtn.addEventListener('click', function(event){
      // console.log('restart game');
      location.reload();
    });

    function setUp(){

      //create array with values
      for(let j=0; j<cardNumber/2 ; j++){
       array[j] = j ;
      }
      //copy the array to get pairs
      let arrayCopy = array;

      //get all cards together
      let arrayFinal = arrayCopy.concat(array);

      //shuffle the array
      arrayFinal = shuffle(arrayFinal);
      // console.log(arrayFinal);

      //event delegation
      board.addEventListener("click", function(event){
        if(event.target.tagName == "DIV" && event.target.getAttribute('data-value')) {
          let grandpa = event.target.parentNode.parentNode;
          grandpa.classList.add('flipped');
          handleCardClick(grandpa);
        }
      });

      //place cards with hidden value
      for (let index = 0; index < cards.length; index++) {
        cards[index].firstElementChild.firstElementChild.setAttribute('data-value',arrayFinal[index]);
        cards[index].firstElementChild.firstElementChild.nextElementSibling.setAttribute('data-value',arrayFinal[index]);
      }
     
    }

    function handleCardClick(card) {
      let cardValueOne;
      let cardValueTwo;
      let cardPos1;
      let cardPos2;

      if(cardOne === null && cardTwo === null){
        
        cardOne = card;
        cardPos1 = card.getAttribute('data-cardpos');
        // console.log('first card flipped', card, cardPos1);
      } else if (cardOne !== null && cardTwo === null) {
        cardTwo = card;
        cardPos2 = card.getAttribute('data-cardpos');
        // console.log('second card flipped', card, cardPos2);
        score++;
        let newScore = document.querySelector('#score-number')
        newScore.innerText = score;
      }
      
      if (cardOne!== null && cardTwo !== null ) {
    
        //get values of cards and compare
        cardValueOne = cardOne.firstElementChild.firstElementChild.getAttribute('data-value');
        cardValueTwo = cardTwo.firstElementChild.firstElementChild.getAttribute('data-value');
        cardPos1 = cardOne.getAttribute('data-cardpos');
        cardPos2 = cardTwo.getAttribute('data-cardpos');
        // console.log("positions");
        // console.log(cardPos1,cardPos2);

        //add condition for separate cards not same card.
        if (cardValueOne == cardValueTwo && cardPos1 !== cardPos2 ) {
          // console.log(cardPos2,cardPos1);
          // console.log('its a pair!');
          pairTotal ++;

        } else {
          // console.log('its not a pair flip back');
          flipback(cardOne,cardTwo);
          
        }
        //if values are equal yay if values are different flip both cards after timer ends
        
        cardOne = null;
        cardTwo = null;

        if (pairTotal === cardNumber/2) {
          // console.log('game is over');
          //indicare game is over
          let notice = document.querySelector('.notice');
          notice.classList.remove('hidden');
          //save lowest score into localstorage
          saveScore(score);
          
        }
      }

      

    }


    function saveScore(score) {
      // console.log(score);
      let lowScore = localStorage.getItem('lowScore');
      // If the user has more points than the currently stored high score then
      if (score < lowScore) {
        // Set the high score to the users' current points
        lowScore = score;
        // Store the high score
        localStorage.setItem('lowScore', lowScore);
      }
    }

    
    function flipback(card1, card2){
      // console.log(card1,card2);  
      setTimeout(function(){
        card1.classList.remove('flipped'); 
        card2.classList.remove('flipped'); 
      },2000);
      
    }
    
    function shuffle(array) {
    //now shuffle the array
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    
    }
    
    setUp();
    
    
    
});