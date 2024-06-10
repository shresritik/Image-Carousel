import { buttonColor, dotsFunc } from "../utils/utils";
import { dots, initDot } from "./constants";
export const buttonSlider = () => {
  dots.forEach((el, i: number) => {
    const element = el as HTMLElement;
    buttonColor(initDot);

    element.addEventListener("click", () => dotsFunc(i));
  });
};
