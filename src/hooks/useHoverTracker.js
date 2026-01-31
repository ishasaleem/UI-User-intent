import { useRef, useState } from "react";

export function useHoverTracker() {
  const hoverStart = useRef({});
  const [hoverDuration, setHoverDuration] = useState({});

  const handleMouseEnter = (field) => {
    hoverStart.current[field] = Date.now();
  };

  const handleMouseLeave = (field) => {
    const start = hoverStart.current[field];
    if (!start) return;

    const duration = (Date.now() - start) / 1000;

    setHoverDuration((prev) => ({
      ...prev,
      [field]: (prev[field] || 0) + duration,
    }));
  };

  return {
    hoverDuration,
    handleMouseEnter,
    handleMouseLeave,
  };
}
