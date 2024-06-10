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

for (let i = 0; i < childElement.length; i++) {
  const styledElement = childElement[i] as HTMLElement;
  styledElement.style.position = "absolute";
  styledElement.style.left = `${i * 100}%`;
  styledElement.style.transition = "all 0.7s ease";
}

for (let i = 0; i < childElement.length; i++) {
  const div = document.createElement("div");
  div.className = "dots";
  dotsContainer?.appendChild(div);
}
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
    const oldNext = parseInt(eachEl.style.left.split("%")[0]);
    if (oldNext == 0 && i == 0) {
      for (let j = childElement.length - 1; j >= 0; j--) {
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

      eachEl.style.left = oldNext + 100 + "%";
    }
    if (eachEl.style.left == "0%") {
      initDot = i;
      buttonColor(initDot);
    }

    i--;
  }
};
const nextFunc = () => {
  let i = 0;
  let flag = false;
  while (!flag && i < childElement.length) {
    const eachEl = childElement[i] as HTMLElement;

    const oldNext = parseInt(eachEl.style.left.split("%")[0]);
    if (oldNext == 0 && i + 1 >= childElement.length) {
      for (let j = 0; j < childElement.length; j++) {
        const eachNextEL = childElement[j] as HTMLElement;

        eachNextEL.style.left = 100 * j + "%";
        if (j == childElement.length - 1) {
          flag = true;
          initDot = 0;
          buttonColor(initDot);
          break;
        }
      }
    } else {
      if (flag) break;

      eachEl.style.left = oldNext - 100 + "%";
    }
    if (eachEl.style.left == "0%") {
      initDot = i;
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
      const eachEl = childElement[dotVal - i] as HTMLElement;
      eachEl.style.left = -100 * i + "%";
      if (dotVal - i == 0) zeroIndex = i;
      buttonColor(dotVal);
    } else if (i - dotVal > 0) {
      const eachChildEl = childElement[i] as HTMLElement;

      eachChildEl.style.left = 100 * (i - zeroIndex) + "%";
    }
    // if (dotVal > initDot) {
    //   if (dotVal - i >= 0) {
    //     childElement[dotVal - i].style.left = -100 * i + "%";
    //     if (dotVal - i == 0) zeroIndex = i;
    //     console.log(dotVal - i, childElement[dotVal - i].style.left);
    //   } else if (i - dotVal > 0) {
    //     childElement[i].style.left = 100 * (i - zeroIndex) + "%";
    //   }
    // } else if (dotVal < initDot) {
    //   console.log(i, dotVal, initDot);
    //   if (dotVal - i >= 0) {
    //     childElement[dotVal - i].style.left = -100 * i + "%";
    //     if (dotVal - i == 0) zeroIndex = i;
    //     console.log(dotVal - i, childElement[dotVal - i].style.left);
    //   } else if (i - dotVal > 0) {
    //     childElement[i].style.left = 100 * (i - zeroIndex) + "%";
    //   }
    // }
    i++;
  }
  initDot = dotVal;

  // childElement[i]
};
prev?.addEventListener("click", prevFunc);
next?.addEventListener("click", nextFunc);
