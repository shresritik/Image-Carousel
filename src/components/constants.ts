export const dotsContainer: HTMLElement | null = document.querySelector(
  ".carousel__dots-container"
);
export const prev: HTMLElement | null = document.getElementById("prev");
export const next: HTMLElement | null = document.getElementById("next");

export const dots = document.querySelectorAll(".dots");
const container: HTMLSelectElement | null = document.querySelector(
  ".carousel-image-wrapper"
);
export const childElement = container?.children as HTMLCollection;
export let initDot = 0;
