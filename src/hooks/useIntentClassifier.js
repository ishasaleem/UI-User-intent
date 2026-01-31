import { useMemo } from "react";

export function useIntentClassifier({ timePerField, reEdits, hoverDuration }) {
  return useMemo(() => {
    const times = Object.values(timePerField);
    const avgTime = times.length
      ? times.reduce((a, b) => a + b, 0) / times.length
      : 0;

    const totalReEdits = Object.values(reEdits).reduce((a, b) => a + b, 0);
    const maxHover = Math.max(0, ...Object.values(hoverDuration));

    if (avgTime > 8 || totalReEdits >= 3 || maxHover > 5)
      return "confused";

    if (avgTime < 3 && totalReEdits === 0)
      return "rushing";

    if (avgTime < 6 && totalReEdits <= 1)
      return "confident";

    return "exploring";
  }, [timePerField, reEdits, hoverDuration]);
}
