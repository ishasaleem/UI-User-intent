import React, { useState } from "react";
import { useFieldTiming } from "./hooks/useFieldTiming";
import { useHoverTracker } from "./hooks/useHoverTracker";
import { useReEditTracker } from "./hooks/useReEditTracker";
import { useIntentClassifier } from "./hooks/useIntentClassifier";

const INTENT_UI = {
  confused: { emoji: "😕", color: "#ff4d6d", hint: "Take your time." },
  rushing: { emoji: "⚡", color: "#34ff9f", hint: "You’re moving very fast." },
  confident: { emoji: "✅", color: "#00ffea", hint: "Great flow!" },
  exploring: { emoji: "👀", color: "#ffd700", hint: "Exploring thoughtfully." },
};

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const { timePerField, onFocus, onBlur } = useFieldTiming();
  const { hoverDuration, onEnter, onLeave } = useHoverTracker();
  const {
    reEdits,
    onChange: onReEditChange,
    onBlur: onReEditBlur,
  } = useReEditTracker();

  const intent = useIntentClassifier({
    timePerField,
    reEdits,
    hoverDuration,
  });

  const ui = INTENT_UI[intent];

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    onReEditChange(field);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={styles.page}>
        <h1 style={{ color: ui.color }}>
          {ui.emoji} Intent: {intent.toUpperCase()}
        </h1>

        <pre style={styles.debug}>
          {JSON.stringify({ timePerField, reEdits, hoverDuration }, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>{ui.emoji} Intent-Aware Form</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        {["name", "email"].map((field) => (
          <input
            key={field}
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={(e) => updateField(field, e.target.value)}
            onFocus={() => onFocus(field)}
            onBlur={() => {
              onBlur(field);
              onReEditBlur(field);
            }}
            onMouseEnter={() => onEnter(field)}
            onMouseLeave={() => onLeave(field)}
            style={{
              ...styles.input,
              borderColor: ui.color,
              boxShadow: `0 0 10px ${ui.color}`,
            }}
          />
        ))}

        <textarea
          placeholder="MESSAGE"
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          onFocus={() => onFocus("message")}
          onBlur={() => {
            onBlur("message");
            onReEditBlur("message");
          }}
          onMouseEnter={() => onEnter("message")}
          onMouseLeave={() => onLeave("message")}
          style={{
            ...styles.input,
            height: "100px",
            borderColor: ui.color,
            boxShadow: `0 0 10px ${ui.color}`,
          }}
        />

        <small style={{ color: ui.color }}>{ui.hint}</small>

        <button style={{ ...styles.button, background: ui.color }}>
          Submit
        </button>
      </form>

      <pre style={styles.debug}>
        {JSON.stringify({ timePerField, reEdits, hoverDuration }, null, 2)}
      </pre>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0ff, #020617)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  form: {
    width: "360px",
    background: "rgba(0,0,0,0.6)",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid",
    background: "transparent",
    color: "#fff",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  debug: {
    marginTop: "20px",
    fontSize: "12px",
    background: "#020617",
    padding: "10px",
    borderRadius: "6px",
    width: "360px",
  },
};
