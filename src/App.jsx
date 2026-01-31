import React, { useState } from "react";
import { useFieldTiming } from "./hooks/useFieldTiming";
import { useReEditTracker } from "./hooks/useReeditTracker";
import { useHoverTracker } from "./hooks/useHoverTracker";
import { useIntentClassifier } from "./hooks/useIntentClassifier";
import Dashboard from "./Dashboard";

export default function App() {
  // States for form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // Show dashboard only after submit

  const { timePerField, handleFocus, handleBlur } = useFieldTiming();
  const { reEdits, handleChange } = useReEditTracker();
  const { hoverDuration, handleMouseEnter, handleMouseLeave } = useHoverTracker();
  const { intent } = useIntentClassifier({ timePerField, reEdits, hoverDuration });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    setSubmitted(true); // Show dashboard
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>✨ Neon Intent-Aware UI ✨</h1>

      {!submitted && (
        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Name Field */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleChange("name");
            }}
            onFocus={() => handleFocus("name")}
            onBlur={() => handleBlur("name")}
            onMouseEnter={() => handleMouseEnter("name")}
            onMouseLeave={() => handleMouseLeave("name")}
            style={{
              ...styles.input,
              borderColor: intent === "😕 Confused" ? "#ff4d6d" : "#0ff",
              boxShadow:
                intent === "😕 Confused"
                  ? "0 0 10px #ff4d6d, 0 0 20px #ff4d6d"
                  : "0 0 5px #0ff, 0 0 10px #0ff",
            }}
          />
          {intent === "😕 Confused" && <small style={styles.hint}>Try entering your full name!</small>}

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange("email");
            }}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            onMouseEnter={() => handleMouseEnter("email")}
            onMouseLeave={() => handleMouseLeave("email")}
            style={{
              ...styles.input,
              borderColor: intent === "⚡ Rushing" ? "#34ff9f" : "#0ff",
              boxShadow:
                intent === "⚡ Rushing"
                  ? "0 0 10px #34ff9f, 0 0 20px #34ff9f"
                  : "0 0 5px #0ff, 0 0 10px #0ff",
            }}
          />
          {intent === "👀 Exploring" && <small style={styles.hint}>You can use any valid email.</small>}

          {/* Message Field */}
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleChange("message");
            }}
            onFocus={() => handleFocus("message")}
            onBlur={() => handleBlur("message")}
            onMouseEnter={() => handleMouseEnter("message")}
            onMouseLeave={() => handleMouseLeave("message")}
            style={{
              ...styles.input,
              height: "100px",
              borderColor: intent === "😕 Confused" ? "#ff4d6d" : "#0ff",
            }}
          />
          {intent === "⚡ Rushing" && <small style={styles.hint}>Keep it short and submit fast!</small>}

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            {intent === "⚡ Rushing" ? "Quick Submit ⚡" : "Submit ✨"}
          </button>
        </form>
      )}

      {/* Dashboard shows only after submit */}
      {submitted && (
        <div style={{ ...styles.dashboardContainer, animation: "fadeIn 1s ease" }}>
          <Dashboard
            timePerField={timePerField}
            reEdits={reEdits}
            hoverDuration={hoverDuration}
            intent={intent}
          />
        </div>
      )}

      {/* Debug info */}
      {!submitted && (
        <pre style={styles.debug}>
          {JSON.stringify(
            {
              timePerField,
              reEdits,
              hoverDuration,
            },
            null,
            2
          )}
        </pre>
      )}

      {/* Animations keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          input, textarea {
            transition: all 0.3s ease;
          }
          input:focus, textarea:focus {
            transform: scale(1.02);
          }
          button {
            transition: all 0.3s ease;
          }
          button:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px #0ff, 0 0 30px #0ff;
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top left, #0ff, #06b, #0f172a)",
    color: "white",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "2.2rem",
    marginBottom: "20px",
    color: "#fff",
    textShadow: "0 0 10px #0ff, 0 0 20px #0ff",
  },
  form: {
    width: "360px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.6)",
    boxShadow: "0 0 20px #0ff, 0 0 40px #0ff inset",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #0ff",
    background: "transparent",
    color: "#fff",
    fontSize: "14px",
  },
  hint: {
    color: "#ffea00",
    fontSize: "12px",
    marginTop: "-8px",
    marginBottom: "8px",
  },
  button: {
    padding: "12px",
    background: "#0ff",
    color: "#0f172a",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    textShadow: "0 0 5px #06b",
  },
  dashboardContainer: {
    marginTop: "30px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  debug: {
    marginTop: "20px",
    fontSize: "12px",
    opacity: 0.8,
    background: "#020617",
    padding: "10px",
    borderRadius: "6px",
  },
};
