var container = document.querySelector(".carousel-image-wrapper");
var dotsContainer = document.querySelector(".carousel__dots-container");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var childElement =
  container === null || container === void 0 ? void 0 : container.children;
var initDot = 0;
// stack all the images horizontal
for (var i = 0; i < childElement.length; i++) {
  var styledElement = childElement[i];
  styledElement.style.position = "absolute";
  styledElement.style.left = "".concat(i * 100, "%");
  styledElement.style.transition = "all 0.7s ease";
}
// create dots for slider
for (var i = 0; i < childElement.length; i++) {
  var div = document.createElement("div");
  div.className = "dots";
  dotsContainer === null || dotsContainer === void 0
    ? void 0
    : dotsContainer.appendChild(div);
}
// change the color of the slider button based on the dotVal / active no
var buttonColor = function (dotVal) {
  dots.forEach(function (button, i) {
    var htmlButton = button;
    if (i == dotVal) {
      htmlButton.style.backgroundColor = "red";
    } else {
      htmlButton.style.backgroundColor = "rgb(184, 184, 184)";
    }
  });
};
var dots = document.querySelectorAll(".dots");
dots.forEach(function (el, i) {
  var element = el;
  buttonColor(initDot);
  element.addEventListener("click", function () {
    return dotsFunc(i);
  });
});
var prevFunc = function () {
  var i = childElement.length - 1;
  var flag = false;
  while (!flag && i >= 0) {
    var eachEl = childElement[i];
    var oldPrev = parseInt(eachEl.style.left.split("%")[0]);
    // checking the left value of current prev
    if (oldPrev == 0 && i == 0) {
      //checking if the first image then move to the last image and reverse
      for (var j = childElement.length - 1; j >= 0; j--) {
        // manually setting the left values for the last and first image
        var eachNextEL = childElement[j];
        eachNextEL.style.left = -100 * (-(j + 1) + childElement.length) + "%";
        buttonColor(childElement.length - 1);
        if (j == 0) {
          flag = true;
          break;
        }
      }
    } else {
      if (flag) break;
      eachEl.style.left = oldPrev + 100 + "%";
    }
    if (eachEl.style.left == "0%") {
      //   let val = initDot(i);
      initDot = i;
      buttonColor(initDot);
    }
    i--;
  }
};
// the next function is on the basis of the left 100%
var nextFunc = function () {
  var i = 0;
  var flag = false;
  while (!flag && i < childElement.length) {
    var eachEl = childElement[i];
    var oldNext = parseInt(eachEl.style.left.split("%")[0]);
    // this if function is for checking for the last image and slides to the first image
    if (oldNext == 0 && i + 1 >= childElement.length) {
      // manually setting the values of the first image after reaching the last image
      for (var j = 0; j < childElement.length; j++) {
        var eachNextEL = childElement[j];
        eachNextEL.style.left = 100 * j + "%";
        if (j == childElement.length - 1) {
          flag = true;
          //   let val = initDot(0);
          initDot = 0;
          buttonColor(initDot);
          break;
        }
      }
    } else {
      if (flag) break;
      //looping through the slider until the last image
      eachEl.style.left = oldNext - 100 + "%";
    }
    // changing the button icon for the active image which is left 0%
    if (eachEl.style.left == "0%") {
      initDot = i;
      //   let val = initDot(i);
      buttonColor(initDot);
    }
    i++;
  }
};
var dotsFunc = function (dotVal) {
  var i = 0;
  var zeroIndex = 0;
  while (i < childElement.length) {
    if (dotVal - i >= 0) {
      // dot botton function logic it sets the 0 on the dotValue index
      var eachEl = childElement[dotVal - i];
      //   sets the value from 0 middle to top
      eachEl.style.left = -100 * i + "%";
      if (dotVal - i == 0) zeroIndex = i;
      buttonColor(dotVal);
    } else if (i - dotVal > 0) {
      //   sets the value from 0 middle to bottom
      var eachChildEl = childElement[i];
      eachChildEl.style.left = 100 * (i - zeroIndex) + "%";
    }
    i++;
  }
  //   setting initDot as it can be used in other places as well
  initDot = dotVal;
};
prev === null || prev === void 0
  ? void 0
  : prev.addEventListener("click", prevFunc);
next === null || next === void 0
  ? void 0
  : next.addEventListener("click", nextFunc);
