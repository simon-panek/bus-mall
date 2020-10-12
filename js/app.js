'use strict';

// global variables ////////////////////////////////////////////////////////////////////////////////////////////////////////
// needed: array of objects, voting rounds

allProducts = [];

var votingRounds = 25; //change this value to control the number of rounds to be run, 25 is default


// constructor function with name of product and filePath parameters//////////////////////////////////////////////////////

function Product(productName, imgFilePath){

  this.productName = productName;
  this.ingFilePath = imgFilePath;
  
  this.productVoteCount = 0;
  this.productDisplayCount = 0;

  allProducts.push(this);
}

console.log(allProducts);

//prototypes//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//random picture render

//instances//////////////////////////////////////////////////////////////////////////////////////////////////////////////

new Product('bag', 'img/ImageBitmapRenderingContext.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom/jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast.jpg', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/petsweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');








// helper functions/////////////////////////////////////////////////////////////////////////////////////////////////////

// random number generator



//event listener: on 'click' generate three new products, increase vote count, increase shown count////////////////////
// remove listener after reaching the target number of rounds



//executables//////////////////////////////////////////////////////////////////////////////////////////////////////////
