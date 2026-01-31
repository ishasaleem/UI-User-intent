import { useState } from "react";

export function useReEditTracker() {
  const [reEdits, setReEdits] = useState({});

  const handleChange = (field) => {
    setReEdits((prev) => ({
      ...prev,
      [field]: prev[field] ? prev[field] + 1 : 1,
    }));
  };

  return {
    reEdits,
    handleChange,
  };
}
