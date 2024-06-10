const container: HTMLSelectElement | null = document.querySelector(
  ".carousel-image-wrapper"
);
const dotsContainer: HTMLElement | null = document.querySelector(
  ".carousel__dots-container"
);
const prev: HTMLElement | null = document.getElementById("prev");
const next: HTMLElement | null = document.getElementById("next");
const childElement = container?.children as HTMLCollection;
let initDot = 0;
// stack all the images horizontal
for (let i = 0; i < childElement.length; i++) {
  const styledElement = childElement[i] as HTMLElement;
  styledElement.style.position = "absolute";
  styledElement.style.left = `${i * 100}%`;
  styledElement.style.transition = "all 0.7s ease";
}
// create dots for slider
for (let i = 0; i < childElement.length; i++) {
  const div = document.createElement("div");
  div.className = "dots";
  dotsContainer?.appendChild(div);
}
// change the color of the slider button based on the dotVal / active no

const buttonColor = (dotVal: number) => {
  dots.forEach((button, i: number) => {
    let htmlButton = button as HTMLElement;
    if (i == dotVal) {
      htmlButton.style.backgroundColor = "red";
    } else {
      htmlButton.style.backgroundColor = "rgb(184, 184, 184)";
    }
  });
};
const dots = document.querySelectorAll(".dots");
dots.forEach((el, i: number) => {
  const element = el as HTMLElement;
  buttonColor(initDot);

  element.addEventListener("click", () => dotsFunc(i));
});

const prevFunc = () => {
  let i = childElement.length - 1;
  let flag = false;

  while (!flag && i >= 0) {
    const eachEl = childElement[i] as HTMLElement;
    const oldPrev = parseInt(eachEl.style.left.split("%")[0]);
    // checking the left value of current prev
    if (oldPrev == 0 && i == 0) {
      //checking if the first image then move to the last image and reverse
      for (let j = childElement.length - 1; j >= 0; j--) {
        // manually setting the left values for the last and first image
        const eachNextEL = childElement[j] as HTMLElement;
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
const nextFunc = () => {
  let i = 0;
  let flag = false;
  while (!flag && i < childElement.length) {
    const eachEl = childElement[i] as HTMLElement;

    const oldNext = parseInt(eachEl.style.left.split("%")[0]);
    // this if function is for checking for the last image and slides to the first image
    if (oldNext == 0 && i + 1 >= childElement.length) {
      // manually setting the values of the first image after reaching the last image
      for (let j = 0; j < childElement.length; j++) {
        const eachNextEL = childElement[j] as HTMLElement;

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
const dotsFunc = (dotVal: number) => {
  let i = 0;
  let zeroIndex = 0;
  while (i < childElement.length) {
    if (dotVal - i >= 0) {
      // dot botton function logic it sets the 0 on the dotValue index
      const eachEl = childElement[dotVal - i] as HTMLElement;
      //   sets the value from 0 middle to top
      eachEl.style.left = -100 * i + "%";
      if (dotVal - i == 0) zeroIndex = i;
      buttonColor(dotVal);
    } else if (i - dotVal > 0) {
      //   sets the value from 0 middle to bottom

      const eachChildEl = childElement[i] as HTMLElement;

      eachChildEl.style.left = 100 * (i - zeroIndex) + "%";
    }
    i++;
  }
  //   setting initDot as it can be used in other places as well
  initDot = dotVal;
};
prev?.addEventListener("click", prevFunc);
next?.addEventListener("click", nextFunc);
const timer = () => {
  setInterval(() => {
    nextFunc();
  }, 5000);
};
window.addEventListener("load", timer);
