import Gsap from "gsap";

export const slideUpFadeIn = (target: string) =>
  Gsap.from(target, {
    opacity: 0,
    y: window.innerHeight,
    duration: 1,
    ease: "power3.out",
  });
