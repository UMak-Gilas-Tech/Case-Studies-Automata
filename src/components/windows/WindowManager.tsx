// src/components/home/WindowManager.tsx
import React, { useState, useEffect } from "react";
import FibonacciWindow from "./win.exer.Fibonacci";
import TribonacciWindow from "./win.exer.Tribonacci";
import CollatzWindow from "./win.exer.Collatz";
import PascalWindow from "./win.exer.PascalTri";
import LucasWindow from "./win.exer.Lucas";
import EuclideanWindow from "./win.exer.Euclidean";
import BernoulliWindow from "./win.exer.Bernoulli";
// …import other windows…

// Map keys to your window components (they must accept `id` + `onClose`)
const WINDOW_COMPONENTS: Record<
  string,
  React.FC<{ id: string; onClose: () => void }>
> = {
  fibonacci: FibonacciWindow,
  tribonacci: TribonacciWindow,
  collatz: CollatzWindow,
  pascal: PascalWindow,
  lucas: LucasWindow,
  euclidean: EuclideanWindow,
  bernoulli: BernoulliWindow,
  // …add more here…
};

type OpenWindow = {
  key: string;
  instanceId: number;
};

const WindowManager: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const key = (e as CustomEvent<string>).detail;
      setOpenWindows((prev) => [
        ...prev,
        { key, instanceId: Date.now() + Math.random() },
      ]);
    };
    window.addEventListener("open-window", handleOpen);
    return () => window.removeEventListener("open-window", handleOpen);
  }, []);

  const handleClose = (instanceId: number) => {
    setOpenWindows((prev) => prev.filter((w) => w.instanceId !== instanceId));
  };

  return (
    <>
      {openWindows.map(({ key, instanceId }) => {
        const Comp = WINDOW_COMPONENTS[key];
        if (!Comp) return null;
        // generate a unique DOM id per instance:
        const uniqueId = `${key}-window-${instanceId}`;
        return (
          <Comp
            key={instanceId}
            id={uniqueId}
            onClose={() => handleClose(instanceId)}
          />
        );
      })}
    </>
  );
};

export default WindowManager;
