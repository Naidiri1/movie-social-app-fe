"use client";

import { useEffect, useState } from "react";

export default function ScrollArrows() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const epsilon = 100;

    const compute = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
      const clientHeight = doc.clientHeight || window.innerHeight;

      const canScroll = scrollHeight - clientHeight > epsilon;
      const atTop = scrollTop <= epsilon;
      const atBottom = scrollTop + clientHeight >= scrollHeight - epsilon;

      setShowUp(canScroll && !atTop);
      setShowDown(canScroll && !atBottom);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);

    const vv = (window as any).visualViewport as VisualViewport | undefined;
    vv?.addEventListener("resize", compute);

    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      vv?.removeEventListener("resize", compute);
    };
  }, []);

  const smooth = (top: number) => window.scrollTo({ top, behavior: "smooth" });

  const scrollTop = () => smooth(0);
  const scrollBottom = () => smooth(document.documentElement.scrollHeight);

  return (
    <div
      className="
        fixed right-20 
        [bottom:calc(env(safe-area-inset-bottom,0)+360px)]
        z-[9999]
        flex flex-col gap-1
        pointer-events-none
      "
    >
      <button
        onClick={scrollTop}
        aria-label="Scroll to top"
        className={`
          pointer-events-auto rounded-full p-3 shadow-lg
          bg-blue-gray-500 text-white hover:bg-blue-gray-500 transition
          backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60
          ${showUp ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="red"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      <button
        onClick={scrollBottom}
        aria-label="Scroll to bottom"
        className={`
          pointer-events-auto rounded-full p-3 shadow-lg
          bg-blue-gray-500 text-white hover:bg-blue-gray-500 transition
          backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60
          ${showDown ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="red"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}
