import { useRef, useState } from "react";

export function useFieldTiming() {
  const focusStart = useRef({});
  const [timePerField, setTimePerField] = useState({});

  const handleFocus = (field) => {
    focusStart.current[field] = Date.now();
  };

  const handleBlur = (field) => {
    const start = focusStart.current[field];
    if (!start) return;

    const duration = (Date.now() - start) / 1000;

    setTimePerField((prev) => ({
      ...prev,
      [field]: (prev[field] || 0) + duration,
    }));
  };

  return {
    timePerField,
    handleFocus,
    handleBlur,
  };
}
