import { useRef, useState } from "react";

export function useFieldTiming() {
  const focusStart = useRef({});
  const [timePerField, setTimePerField] = useState({});

  const onFocus = (field) => {
    focusStart.current[field] = Date.now();
  };

  const onBlur = (field) => {
    const start = focusStart.current[field];
    if (!start) return;

    const seconds = (Date.now() - start) / 1000;

    setTimePerField((prev) => ({
      ...prev,
      [field]: +(prev[field] || 0 + seconds).toFixed(2),
    }));
  };

  return { timePerField, onFocus, onBlur };
}
