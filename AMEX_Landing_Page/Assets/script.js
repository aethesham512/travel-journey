//clicks accordion after clicking button

var button = document.getElementById('click-on-me');
button.addEventListener('click', clicksButton)

function clicksButton() {
    var accordion = document.getElementById('chck2');
    accordion.click()

}

// Defining global variables
let colLeft = document.querySelector('.column-left');
let colRight = document.querySelector('.column-right');
let hideElements = document.querySelectorAll('.hide');
let formDesktop = document.querySelector("#form-desktop");
let formBox = document.querySelector("#form-box");

let leftHeight = colLeft.scrollHeight;
let rightHeight = colRight.scrollHeight;

let leftReachedBottom = false;
let rightReachedBottom = false;
let leftReachedTop = true;
let rightReachedTop = true;

let touchScreen = false;
let scrollDown = false;

let touchPos;

// ***Adding tablet compatibility***
// store the touching position at the start of each touch
document.body.ontouchstart = function(e){
    touchPos = e.changedTouches[0].clientY;
}

// detect wether the "old" touchPos is 
// greater or smaller than the newTouchPos
document.body.ontouchmove = function(e){
    let newTouchPos = e.changedTouches[0].clientY;
    if(newTouchPos < touchPos) {
        scrollDown = true;
    }
}

// Checking whether columns reached bottom everytime user scrolls
function checkScrollLeft() {
  if (!leftReachedBottom && (10 + colLeft.scrollTop + colLeft.offsetHeight) >= leftHeight) {
    leftReachedBottom = true;
  }

  if (leftReachedBottom && colLeft.scrollTop + colLeft.offsetHeight < leftHeight) {
    leftReachedBottom = false;
  }

  if (!rightReachedBottom && (10 + colRight.scrollTop + colRight.offsetHeight) >= rightHeight) {
    rightReachedBottom = true;
  }

  if (rightReachedBottom && colRight.scrollTop + colRight.offsetHeight < rightHeight) {
    rightReachedBottom = false;
  }

}

document.addEventListener('wheel', checkScrollLeft);
document.body.addEventListener('touchmove', checkScrollLeft);

//Prevent multiple scroll events
function throttleLeft(fn, wait) {
  var time = Date.now();

  return function(event) {
    
    // we dismiss every wheel event with deltaY less than 4
    if (Math.abs(event.deltaY) < 4) return

    if ((time + wait - Date.now()) < 0) {
      fn(event);
      time = Date.now();
    }
  }
}

//Trigger scroll on the opposite column if conditions met
function callbackLeft(event) {
  if (leftReachedBottom === true && event.deltaY > 4 || leftReachedBottom === true && scrollDown === true) {
  $(colRight).animate({'scrollTop': '+=500'});
}
}

function throttleRight(fn, wait) {
  var time = Date.now();

  return function(event) {
    // we dismiss every wheel event with deltaY less than 4
    if (Math.abs(event.deltaY) < 4) return

    if ((time + wait - Date.now()) < 0) {
      fn(event);
      time = Date.now();
    }
  }
}

function callbackRight(event) {
  if (rightReachedBottom === true && event.deltaY > 4 || rightReachedBottom === true && scrollDown === true) {
  $(colLeft).animate({'scrollTop': '+=500'});
}
}

colLeft.addEventListener("wheel", throttleLeft(callbackLeft, 500));
colRight.addEventListener("wheel", throttleRight(callbackRight, 500));

colLeft.addEventListener("touchmove", throttleLeft(callbackLeft, 500));
colRight.addEventListener("touchmove", throttleRight(callbackRight, 500));

// If both columns reached the bottom, unlock section
function unlockSection(){
  if (rightReachedBottom && leftReachedBottom) {
    hideElements.forEach(element => {
      element.classList.remove('hide');
    });
  }
}

window.addEventListener("wheel", unlockSection);
window.addEventListener("touchmove", unlockSection);

function checkScreenSize() {
  if (window.innerWidth < 769) {
    formDesktop.remove();
 leftHeight = colLeft.scrollHeight;
 rightHeight = colRight.scrollHeight;
  } else {

    leftHeight = colLeft.scrollHeight;
    rightHeight = colRight.scrollHeight;
    // Add the form-desktop element back if it was previously removed
    if (!formDesktop.parentNode) {

    }
  }
}

// Check the screen size on page load
checkScreenSize();

// Add an event listener for changes in screen size
window.addEventListener("resize", checkScreenSize);