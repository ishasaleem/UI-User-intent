export function useIntentClassifier({ timePerField, reEdits, hoverDuration }) {
  const calculateIntent = () => {
    const avgTime = Object.values(timePerField).length
      ? Object.values(timePerField).reduce((a, b) => a + b, 0) /
        Object.values(timePerField).length
      : 0;

    const totalReEdits = Object.values(reEdits).reduce((a, b) => a + b, 0);
    const maxHover = Object.values(hoverDuration).length
      ? Math.max(...Object.values(hoverDuration))
      : 0;

    // Rules
    if (totalReEdits > 3 || maxHover > 5 || avgTime > 10) return "😕 Confused";
    if (avgTime < 5 && totalReEdits === 0) return "✅ Confident";
    if (avgTime < 3 || maxHover < 1) return "⚡ Rushing";
    return "👀 Exploring";
  };

  return {
    intent: calculateIntent(),
  };
}
