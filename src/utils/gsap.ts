import gsap from "gsap";

export const slideUpFadeIn = ({
  window,
  target,
}: {
  window: Window;
  target: string;
}) => {
  gsap.from(target, {
    opacity: 0,
    y: window.innerHeight,
    duration: 1,
    ease: "power3.out",
  });
};
