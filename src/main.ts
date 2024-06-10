const container: HTMLSelectElement | null = document.querySelector(
  ".carousel-image-wrapper"
);
const dotsContainer: HTMLElement | null = document.querySelector(
  ".carousel__dots-container"
);
const prev: HTMLElement | null = document.getElementById("prev");
const next: HTMLElement | null = document.getElementById("next");
const childElement = container?.children!;
for (let i = 0; i < childElement.length; i++) {
  childElement[i].style.position = "absolute";
  childElement[i].style.left = `${i * 100}%`;
  childElement[i].style.transition = "all 0.7s ease";
}

for (let i = 0; i < childElement.length; i++) {
  const div = document.createElement("div");
  div.className = "dots";
  dotsContainer.appendChild(div);
}
let initDot = 0;
const buttonColor = (dotVal: number) => {
  console.log("dotVal", dotVal);
  dots.forEach((button: any, i: number) => {
    console.log(i, dotVal);
    if (i == dotVal) {
      button.style.backgroundColor = "red";
    } else {
      button.style.backgroundColor = "rgb(184, 184, 184)";
    }
  });
};
const dots = document.querySelectorAll(".dots");
dots.forEach((el: any, i: number) => {
  buttonColor(initDot);

  el.addEventListener("click", () => dotsFunc(i));
});

const prevFunc = (e: any) => {
  e.preventDefault();
  let i = childElement.length - 1;
  let flag = false;
  console.log("init", initDot);

  while (!flag && i >= 0) {
    const oldNext = parseInt(childElement[i].style.left.split("%")[0]);
    if (oldNext == 0 && i == 0) {
      for (let j = childElement.length - 1; j >= 0; j--) {
        childElement[j].style.left =
          -100 * (-(j + 1) + childElement.length) + "%";
        buttonColor(childElement.length - 1);
        if (j == 0) {
          flag = true;

          break;
        }
      }
    } else {
      if (flag) break;

      childElement[i].style.left = oldNext + 100 + "%";
    }
    console.log("val", i, childElement[i].style.left);
    if (childElement[i].style.left == "0%") {
      initDot = i;
      buttonColor(initDot);
    }

    i--;
  }
};
const nextFunc = (e: any) => {
  e.preventDefault();
  let i = 0;
  let flag = false;
  while (!flag && i < childElement.length) {
    const oldNext = parseInt(childElement[i].style.left.split("%")[0]);
    if (oldNext == 0 && i + 1 >= childElement.length) {
      for (let j = 0; j < childElement.length; j++) {
        childElement[j].style.left = 100 * j + "%";
        if (j == childElement.length - 1) {
          flag = true;
          initDot = 0;
          buttonColor(initDot);
          break;
        }
      }
    } else {
      if (flag) break;

      childElement[i].style.left = oldNext - 100 + "%";
    }
    if (childElement[i].style.left == "0%") {
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
      childElement[dotVal - i].style.left = -100 * i + "%";
      if (dotVal - i == 0) zeroIndex = i;
      buttonColor(dotVal);
    } else if (i - dotVal > 0) {
      childElement[i].style.left = 100 * (i - zeroIndex) + "%";
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
prev.addEventListener("click", prevFunc);
next.addEventListener("click", nextFunc);
