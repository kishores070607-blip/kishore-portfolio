import gsap from "gsap";

export function createIntroTimeline() {
  const timeline = gsap.timeline({
    defaults: {
      ease: "power4.out",
    },
  });

  gsap.set(
    [".intro-meta", ".intro-label", ".intro-title", ".intro-footer"],
    {
      opacity: 0,
    },
  );

  timeline
    .fromTo(
      ".intro-meta",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
    )
    .fromTo(
      ".intro-label",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.45",
    )
    .fromTo(
      ".intro-title",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
      },
      "-=0.45",
    )
    .fromTo(
      ".intro-footer",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      "-=0.65",
    );

  return timeline;
}

export function createEnterTransition() {
  const timeline = gsap.timeline({
    defaults: {
      ease: "power4.inOut",
    },
  });

  gsap.set("#site-content", {
    autoAlpha: 0,
    y: 30,
  });

  timeline
    .to(".intro-footer", {
      opacity: 0,
      y: 20,
      duration: 0.3,
    })
    .to(
      ".intro-label",
      {
        opacity: 0,
        y: -20,
        duration: 0.35,
      },
      "-=0.15",
    )
    .to(
      ".intro-meta",
      {
        opacity: 0,
        y: -20,
        duration: 0.35,
      },
      "-=0.25",
    )
    .to(
      ".intro-title",
      {
        scale: 1.08,
        letterSpacing: "-0.04em",
        duration: 0.9,
      },
      "-=0.25",
    )
    .to(
      "#intro",
      {
        scale: 1.04,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.45",
    )
    .set("#intro", {
      display: "none",
    })
    .to(
      "#site-content",
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.3",
    );

  return timeline;
}