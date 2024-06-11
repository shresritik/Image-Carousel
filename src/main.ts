class Carousel {
  private container: HTMLSelectElement | null;
  private dotsContainer: HTMLSelectElement | null;
  private dots: Element[] | null = null;
  private prev: HTMLElement | null;
  private next: HTMLElement | null;
  private childElement: HTMLCollection | null | undefined;
  private initDot: number;
  constructor() {
    this.container = document.querySelector(".carousel-image-wrapper");
    this.dotsContainer = document.querySelector(".carousel__dots-container");
    this.prev = document.getElementById("prev");
    this.next = document.getElementById("next");
    this.childElement = this.container?.children;
    this.initDot = 0;
    // this.dots = [...document.getElementsByClassName("dots")];
    // console.log(this.dots);
  }
  buttonColor = (dotVal: number) => {
    if (!this.dots) return;
    this.dots.forEach((button, i: number) => {
      let htmlButton = button as HTMLElement;
      if (i == dotVal) {
        htmlButton.style.backgroundColor = "red";
      } else {
        htmlButton.style.backgroundColor = "rgb(184, 184, 184)";
      }
    });
  };
  prevFunc = () => {
    if (this.childElement == null) return;
    let i = this.childElement.length - 1;
    let flag = false;

    while (!flag && i >= 0) {
      const eachEl = this.childElement[i] as HTMLElement;
      const oldPrev = parseInt(eachEl.style.left.split("%")[0]);
      // checking the left value of current prev
      if (oldPrev == 0 && i == 0) {
        //checking if the first image then move to the last image and reverse
        for (let j = this.childElement.length - 1; j >= 0; j--) {
          // manually setting the left values for the last and first image
          const eachNextEL = this.childElement[j] as HTMLElement;
          eachNextEL.style.left =
            -100 * (-(j + 1) + this.childElement.length) + "%";
          this.buttonColor(this.childElement.length - 1);
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
        this.initDot = i;
        this.buttonColor(this.initDot);
      }

      i--;
    }
  };
  nextFunc = () => {
    let i = 0;
    let flag = false;
    if (!this.childElement) return;

    while (!flag && i < this.childElement.length) {
      const eachEl = this.childElement[i] as HTMLElement;

      const oldNext = parseInt(eachEl.style.left.split("%")[0]);
      // this if function is for checking for the last image and slides to the first image
      if (oldNext == 0 && i + 1 >= this.childElement.length) {
        // manually setting the values of the first image after reaching the last image
        for (let j = 0; j < this.childElement.length; j++) {
          const eachNextEL = this.childElement[j] as HTMLElement;

          eachNextEL.style.left = 100 * j + "%";
          if (j == this.childElement.length - 1) {
            flag = true;
            //   let val = initDot(0);
            this.initDot = 0;
            this.buttonColor(this.initDot);
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
        this.initDot = i;
        //   let val = initDot(i);

        this.buttonColor(this.initDot);
      }
      i++;
    }
  };
  dotsFunc = (dotVal: number) => {
    let i = 0;
    let zeroIndex = 0;
    if (!this.childElement) return;
    while (i < this.childElement.length) {
      if (dotVal - i >= 0) {
        // dot botton function logic it sets the 0 on the dotValue index
        const eachEl = this.childElement[dotVal - i] as HTMLElement;
        //   sets the value from 0 middle to top
        eachEl.style.left = -100 * i + "%";
        if (dotVal - i == 0) zeroIndex = i;
        this.buttonColor(dotVal);
      } else if (i - dotVal > 0) {
        //   sets the value from 0 middle to bottom

        const eachChildEl = this.childElement[i] as HTMLElement;

        eachChildEl.style.left = 100 * (i - zeroIndex) + "%";
      }
      i++;
    }
    //   setting initDot as it can be used in other places as well
    this.initDot = dotVal;
  };
  init = () => {
    if (!this.childElement) return;
    // stack all the images horizontal
    for (let i = 0; i < this.childElement.length; i++) {
      const styledElement = this.childElement[i] as HTMLElement;
      styledElement.style.position = "absolute";
      styledElement.style.left = `${i * 100}%`;
      styledElement.style.transition = "all 0.7s ease";
    }
    // create dots for slider
    for (let i = 0; i < this.childElement.length; i++) {
      const div = document.createElement("div");
      div.className = "dots";
      this.dotsContainer?.appendChild(div);
    }
    // change the color of the slider button based on the dotVal / active no
    this.dots = [...document.getElementsByClassName("dots")];

    this.dots?.forEach((el, i: number) => {
      const element = el as HTMLElement;
      this.buttonColor(this.initDot);

      element.addEventListener("click", () => this.dotsFunc(i));
    });

    // the next function is on the basis of the left 100%
    this.prev?.addEventListener("click", this.prevFunc);
    this.next?.addEventListener("click", this.nextFunc);
    const timer = () => {
      setInterval(() => {
        this.nextFunc();
      }, 5000);
    };
    window.addEventListener("load", timer);
  };
}
const c1 = new Carousel();
c1.init();
