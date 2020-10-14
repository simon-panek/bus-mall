'use strict';

// global variables ////////////////////////////////////////////////////////////////////////////////////////////////////////
// needed: array of objects, voting rounds

var votingRounds = 25; //change this value to control the number of rounds to be run, 25 is default
var votingRoundTracker = 1; //keeps track of each round of voting, starts at 1 because the initial vote is populated at page load

var allProducts = [];

var imageOneElement = document.getElementById('imgOne');
var imageTwoElement = document.getElementById('imgTwo');
var imageThreeElement = document.getElementById('imgThree');

var imageSection = document.getElementById('imgSection');
var sectionResults = document.getElementById('imgSection');
var resultsButton = document.getElementById('resultsButton');
var sectionInstruction = document.getElementById('instructionMessage');

var randomNumberTracker = [];
// var randomCombinationTracker =[];

var mostRecentSet = [];
var runningRecord = [];

// local storage check /////////////////////////////////////////////////////////////////////////////////////////////////////

function localStorageCheck() {
  var productsFromLocalStorage = localStorage.getItem('allProducts');

  if (productsFromLocalStorage)
  {

    var parsedAllProducts = JSON.parse(productsFromLocalStorage);

    console.log('parsedAllProducts from storage', parsedAllProducts);
    //create instances for each of the parsed in products

    for ( var i=0; i<parsedAllProducts.length; i++){

      new Product(parsedAllProducts[i].productName, parsedAllProducts[i].imgFilePath, parsedAllProducts[i].productVoteCount, parsedAllProducts[i].productDisplayCount);

      console.log('parsedAllProducts[i].productName', parsedAllProducts[i].productName);
      console.log('parsedAllProducts[i].imgFilePath', parsedAllProducts[i].imgFilePath);
      console.log('parsedAllProducts[i].productVoteCount', parsedAllProducts[i].productVoteCount);
      console.log('parsedAllProducts[i].productDisplayCount', parsedAllProducts[i].productDisplayCount);

    }

    console.log('allProducts after creating new instances from storage', allProducts);

  } else { //add new instances
    generateNewInstances();
  }


}


// constructor function ////////////////////////////////////////////////////////////////////////////////////////////////////

function Product(productName, imgFilePath, productVoteCount = 0, productDisplayCount = 0){

  this.productName = productName;
  this.imgFilePath = imgFilePath;

  this.productVoteCount = productVoteCount;
  this.productDisplayCount = productDisplayCount;


  allProducts.push(this);
}

console.log(allProducts);

//new instances//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function generateNewInstances(){

  new Product('bag', 'img/bag.jpg');
  new Product('banana', 'img/banana.jpg');
  new Product('bathroom', 'img/bathroom.jpg');
  new Product('boots', 'img/boots.jpg');
  new Product('breakfast.jpg', 'img/breakfast.jpg');
  new Product('bubblegum', 'img/bubblegum.jpg');
  new Product('chair', 'img/chair.jpg');
  new Product('cthulhu', 'img/cthulhu.jpg');
  new Product('dog-duck', 'img/dog-duck.jpg');
  new Product('dragon', 'img/dragon.jpg');
  new Product('pen', 'img/pen.jpg');
  new Product('pet-sweep', 'img/pet-sweep.jpg');
  new Product('scissors', 'img/scissors.jpg');
  new Product('shark', 'img/shark.jpg');
  new Product('sweep', 'img/sweep.png');
  new Product('tauntaun', 'img/tauntaun.jpg');
  new Product('unicorn', 'img/unicorn.jpg');
  new Product('usb', 'img/usb.gif');
  new Product('water-can', 'img/water-can.jpg');
  new Product('wine-glass', 'img/wine-glass.jpg');
}
  
//funtions//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//random picture render
function render(imageElement){
  var randomIndexPosition = randomNumberGenerator (0, allProducts.length-1);


  while(randomNumberTracker.includes(randomIndexPosition)){
    randomIndexPosition = randomNumberGenerator (0, allProducts.length-1);
  }

  imageElement.src = allProducts[randomIndexPosition].imgFilePath;
  imageElement.alt = allProducts[randomIndexPosition].productName;

  mostRecentSet.push(imageElement.alt); //records each set of images printed to the screen
  // console.log('mostRecentSet', mostRecentSet);

  allProducts[randomIndexPosition].productDisplayCount ++;

  if (randomNumberTracker.length > 5){
    randomNumberTracker.shift();
  }

  randomNumberTracker.push(randomIndexPosition);

}

// random number generator

function randomNumberGenerator(min, max){
  return Math.floor(Math.random() * (max - min +1) + min);
}

//event listener: on 'click' generate three new products, increase vote count, increase shown count////////////////////
// remove listener after reaching the target number of rounds

imageSection.addEventListener('click', function(event){ // listens for click then runs function
  if(votingRoundTracker < votingRounds+1){

    var chosenProduct = event.target.alt; //declares variable to store which picture was clicked on to increase appropriate vote count
    // console.log(event.target);
    // console.log(event.target.alt);
    // console.log(chosenProduct);

    runningRecord.push(mostRecentSet); //keeps a running record of all images shown to the screen
    // console.log('runningRecord', runningRecord);
    mostRecentSet = [];

    render(imageOneElement);
    render(imageTwoElement);
    render(imageThreeElement);


    for (var i=0; i<allProducts.length; i++){
      if(chosenProduct === allProducts[i].productName){
        allProducts[i].productVoteCount++;
      }
    }

    votingRoundTracker++;

  } else {
    sectionInstruction.innerHTML = '';
    var pElement = document.createElement('p');
    pElement.textContent = 'Thank you for your input. Please press the View Results button.';
    sectionInstruction.appendChild (pElement);

    imageSection.removeEventListener; // stops event listener
    // this is where to output final scores
    //finalTallyRender() should be run in a different function that is triggered by the Results button
    //finalTallyRender();
  }

  var stringifyAllProducts = JSON.stringify(allProducts); // prep array for storage
  localStorage.setItem('allProducts', stringifyAllProducts); // push to local storage

});

//renders the final tallies for all products

resultsButton.addEventListener('click', finalTallyRender);

// console.log('after listener', allProducts);

function finalTallyRender(){ //renders final totals

  /////////////////////////////////////////////////////////////////working but obsolete below///////////////////////////////////////////////////

  // for (var i=0; i<allProducts.length; i++){


  //   var product = allProducts[i].productName;
  //   var displayCount = allProducts[i].productDisplayCount;
  //   var votes = allProducts[i].productVoteCount;
  //   // var percentage = Math.round((votes / displayCount) * 100);

  //   // console.log('votes', votes, 'displayCount', displayCount, 'percentage', percentage);

  //   // var outputString = `${product}  was shown  ${displayCount}  times and chosen  ${votes}  times. It was selected  ${percentage}  % of the times it was shown.`;

  //   var outputString = `${product} had ${votes} votes, and was seen ${displayCount} times.`;

  //   console.log(outputString);

  //   var pElement = document.createElement('p');
  //   pElement.textContent = outputString;
  //   sectionResults.appendChild(pElement);

  // }

  ////////////////////////////////////////////////////////////////////working but obsolete above/////////////////////////////////////////////////

  generateChart(); // calls function to generate chart

  votingRoundTracker = votingRounds + 2; // Prevents further image loads after pressing the view results button

  resultsButton.removeEventListener ('click', finalTallyRender);

}


//executables//////////////////////////////////////////////////////////////////////////////////////////////////////////

localStorageCheck();
render(imageOneElement);
render(imageTwoElement);
render(imageThreeElement);

//chart///////////////////////////////////////////////////////////////////////////////////////////////////////////////



function generateChart(){ //creates a bar chart that displays votes and display values for each product, should only appear after voting completes
  var productNameArray = []; //array of all product names
  var productDisplayCountArray = []; //array of all product display counts
  var votesArray = []; //array of all votes per product
  var percentageArray = []; //percentage of times a product was selected when displayed
  var differenceVotesDisplayArray = []; //stores the value of total displays minus the votes received by a product

  for (var i=0; i<allProducts.length; i++){

    var product = allProducts[i].productName;
    var displayCount = allProducts[i].productDisplayCount;
    var votes = allProducts[i].productVoteCount;
    var percentage = Math.round((votes / displayCount) * 100);

    productNameArray.push(product);
    productDisplayCountArray.push(displayCount);
    votesArray.push(votes);
    percentageArray.push(percentage);

    differenceVotesDisplayArray.push(allProducts[i].productDisplayCount - allProducts[i].productVoteCount);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNameArray, //horizontal axis labels
      datasets: [{
        label: '# of Votes',
        data: votesArray, //votes received by each product
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 2
      },
      {
        label: '# of Times Shown but Not Selected',
        data: differenceVotesDisplayArray, //times shown - votes received
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, .8)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 86, .8)',
          'rgba(75, 192, 192, .8)',
          'rgba(153, 102, 255, .8)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 99, 132, .8)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 86, .8)',
          'rgba(75, 192, 192, .8)',
          'rgba(153, 102, 255, .8)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 99, 132, .8)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 86, .8)',
          'rgba(75, 192, 192, .8)',
          'rgba(153, 102, 255, .8)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 99, 132, .8)',
          'rgba(54, 162, 235, .8)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'black'
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true,
            fontColor: 'black'
          }
        }],
        xAxes: [{
          stacked: true,
          ticks: {
            fontColor: 'black'
          }
        }]
      }
    }
  });
}
