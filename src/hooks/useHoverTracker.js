import { useRef, useState } from "react";

export function useHoverTracker() {
  const hoverStart = useRef({});
  const [hoverDuration, setHoverDuration] = useState({});

  const onEnter = (field) => {
    hoverStart.current[field] = Date.now();
  };

  const onLeave = (field) => {
    const start = hoverStart.current[field];
    if (!start) return;

    const seconds = (Date.now() - start) / 1000;

    setHoverDuration((prev) => ({
      ...prev,
      [field]: +(prev[field] || 0 + seconds).toFixed(2),
    }));
  };

  return { hoverDuration, onEnter, onLeave };
}
