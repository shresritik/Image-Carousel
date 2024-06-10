const container: any = document.querySelector(".carousel-container");
const dotsContainer: any = document.querySelector(".dots-container");
const containerBtns: any = document.getElementsByClassName("carousel-btns");
const prev: any = document.getElementById("prev");
const next: any = document.getElementById("next");
const childElement = container.children;
for (let i = 0; i < childElement.length; i++) {
  childElement[i].style.position = "absolute";
  childElement[i].style.top = "0";
  childElement[i].style.left = `${i * 100}%`;
  childElement[i].style.right = `${i * 100}%`;
  childElement[i].style.border = "2px solid red";
  childElement[i].style.transition = "all 1s ease";
}
for (let i = 0; i < containerBtns.length; i++) {
  containerBtns[i].style.position = "absolute";
  containerBtns[i].style.bottom = "0";
}
for (let i = 0; i < childElement.length; i++) {
  const div = document.createElement("div");
  div.className = "dots";
  dotsContainer.appendChild(div);
}
const prevFunc = (e: any) => {
  e.preventDefault();
  let i = childElement.length - 1;
  let flag = false;
  while (!flag && i >= 0) {
    const oldNext = parseInt(childElement[i].style.left.split("%")[0]);

    // if (oldNext == 0 && i + 1 >= childElement.length) {
    //   for (let j = 0; j < childElement.length; j++) {
    //     childElement[j].style.left = 100 * j + "%";
    //     flag = true;
    //     if (j == childElement.length - 1) break;
    //   }
    // } else {
    // if (flag) break;
    if (oldNext == 0 && i == 0) {
      for (let j = childElement.length - 1; j >= 0; j--) {
        console.log(j, -100 * (-j + childElement.length));
        childElement[j].style.left =
          -100 * (-(j + 1) + childElement.length) + "%";
        flag = true;

        if (j == 0) {
          console.log("first");

          break;
        }
      }
    } else {
      if (flag) break;

      childElement[i].style.left = oldNext + 100 + "%";
      i--;
    }
    // }
  }
};
const nextFunc = (e: any) => {
  e.preventDefault();
  let i = 0;
  let flag = false;
  while (!flag && i < childElement.length) {
    const oldNext = parseInt(childElement[i].style.left.split("%")[0]);
    childElement[i].style.right = 0 + "%";

    if (oldNext == 0 && i + 1 >= childElement.length) {
      for (let j = 0; j < childElement.length; j++) {
        childElement[j].style.left = 100 * j + "%";
        flag = true;
        if (j == childElement.length - 1) break;
      }
    } else {
      if (flag) break;
      childElement[i].style.left = oldNext - 100 + "%";
      i++;
    }
  }
};
const dotsFunc = () => {};
prev.addEventListener("click", prevFunc);
next.addEventListener("click", nextFunc);
const dots = document.querySelectorAll(".dots");
dots.forEach((el: any) => {
  el.addEventListener("click", dotsFunc);
});
