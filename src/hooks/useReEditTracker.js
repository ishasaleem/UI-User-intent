import { useRef, useState } from "react";

export function useReEditTracker() {
  const touched = useRef({});
  const [reEdits, setReEdits] = useState({});

  const onBlur = (field) => {
    touched.current[field] = true;
  };

  const onChange = (field) => {
    if (!touched.current[field]) return;

    setReEdits((prev) => ({
      ...prev,
      [field]: (prev[field] || 0) + 1,
    }));
  };

  return { reEdits, onChange, onBlur };
}
