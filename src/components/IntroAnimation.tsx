"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import {
  createIntroTimeline,
  createEnterTransition,
} from "@/animations/hero";

export default function IntroAnimation() {
  useLayoutEffect(() => {
    // Always start the portfolio at the top.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Prevent scrolling while the intro is active.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overscrollBehavior = "none";

    let hasEntered = false;

    const context = gsap.context(() => {
      const introTimeline = createIntroTimeline();

      const enterButton = document.querySelector(
        "#enter-button",
      ) as HTMLButtonElement | null;

      if (!enterButton) {
        return;
      }

      const handleEnter = () => {
        if (hasEntered) return;

        hasEntered = true;
        enterButton.disabled = true;

        const transition = createEnterTransition();

        transition.eventCallback("onComplete", () => {
          // Enable normal scrolling.
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";

          document.documentElement.style.overscrollBehavior = "";
          document.body.style.overscrollBehavior = "";

          // Start the actual portfolio at HOME.
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
          });

          // Tell Navigation that the portfolio has been entered.
          window.dispatchEvent(
            new CustomEvent("portfolio:entered"),
          );
        });
      };

      enterButton.addEventListener("click", handleEnter);

      return () => {
        introTimeline.kill();
        enterButton.removeEventListener("click", handleEnter);
      };
    });

    return () => {
      context.revert();

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  return null;
}