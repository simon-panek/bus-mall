'use strict';

// global variables ////////////////////////////////////////////////////////////////////////////////////////////////////////
// needed: array of objects, voting rounds

var votingRounds = 5; //change this value to control the number of rounds to be run, 25 is default
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

// constructor function with name of product and filePath parameters//////////////////////////////////////////////////////

function Product(productName, imgFilePath, imageNumber){

  this.productName = productName;
  this.imgFilePath = imgFilePath;
  this.imageNumber = imageNumber;

  this.productVoteCount = 0;
  this.productDisplayCount = 0;


  allProducts.push(this);
}

console.log(allProducts);

//instances//////////////////////////////////////////////////////////////////////////////////////////////////////////////

new Product('bag', 'img/bag.jpg', 1);
new Product('banana', 'img/banana.jpg', 2);
new Product('bathroom', 'img/bathroom.jpg', 3);
new Product('boots', 'img/boots.jpg', 4);
new Product('breakfast.jpg', 'img/breakfast.jpg', 5);
new Product('bubblegum', 'img/bubblegum.jpg', 6);
new Product('chair', 'img/chair.jpg', 7);
new Product('cthulhu', 'img/cthulhu.jpg', 8);
new Product('dog-duck', 'img/dog-duck.jpg', 9);
new Product('dragon', 'img/dragon.jpg', 10);
new Product('pen', 'img/pen.jpg', 11);
new Product('pet-sweep', 'img/pet-sweep.jpg', 12);
new Product('scissors', 'img/scissors.jpg', 13);
new Product('shark', 'img/shark.jpg', 14);
new Product('sweep', 'img/sweep.png', 15);
new Product('tauntaun', 'img/tauntaun.jpg', 16);
new Product('unicorn', 'img/unicorn.jpg', 17);
new Product('usb', 'img/usb.gif', 18);
new Product('water-can', 'img/water-can.jpg', 19);
new Product('wine-glass', 'img/wine-glass.jpg', 20);

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


  resultsButton.removeEventListener ('click', finalTallyRender);

}


//executables//////////////////////////////////////////////////////////////////////////////////////////////////////////

render(imageOneElement);
render(imageTwoElement);
render(imageThreeElement);

//chart///////////////////////////////////////////////////////////////////////////////////////////////////////////////



function generateChart(){ //creates a bar chart that displays votes and display values for each product, should only appear after voting completes
  var productNameArray = [];
  var productDisplayCountArray = [];
  var votesArray = [];
  var percentageArray = [];

  for (var i=0; i<allProducts.length; i++){

    var product = allProducts[i].productName;
    var displayCount = allProducts[i].productDisplayCount;
    var votes = allProducts[i].productVoteCount;
    var percentage = Math.round((votes / displayCount) * 100);

    productNameArray.push(product);
    productDisplayCountArray.push(displayCount);
    votesArray.push(votes);
    percentageArray.push(percentage);


    //   // console.log('votes', votes, 'displayCount', displayCount, 'percentage', percentage);

    //   // var outputString = `${product}  was shown  ${displayCount}  times and chosen  ${votes}  times. It was selected  ${percentage}  % of the times it was shown.`;

    //   var outputString = `${product} had ${votes} votes, and was seen ${displayCount} times.`;

    //   console.log(outputString);

  //   var pElement = document.createElement('p');
  //   pElement.textContent = outputString;
  //   sectionResults.appendChild(pElement);
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
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
