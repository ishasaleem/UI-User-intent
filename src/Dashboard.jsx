import React from "react";

export default function Dashboard({ timePerField, reEdits, hoverDuration, intent }) {
  const totalTime = Object.values(timePerField).reduce((a, b) => a + b, 0).toFixed(2);
  const totalReEdits = Object.values(reEdits).reduce((a, b) => a + b, 0);
  const maxHover = Object.values(hoverDuration).length
    ? Math.max(...Object.values(hoverDuration)).toFixed(2)
    : 0;

  const metrics = [
    { title: "Current Intent", value: intent },
    { title: "Total Time on Fields", value: `${totalTime}s` },
    { title: "Total Re-Edits", value: totalReEdits },
    { title: "Max Hover Duration", value: `${maxHover}s` },
  ];

  return (
    <div style={styles.dashboard}>
      <h3 style={styles.heading}>Admin Dashboard</h3>

      <div style={styles.cardsContainer}>
        {metrics.map((metric, idx) => (
          <div key={idx} style={styles.card} className="card">
            <h4 style={styles.cardTitle}>{metric.title}</h4>
            <p style={styles.cardValue}>{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p style={styles.scrollHint}>Swipe or scroll →</p>

      {/* Animations */}
      <style>
        {`
          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.3);
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  dashboard: {
    marginTop: "40px",
    padding: "20px",
    width: "100%",
    maxWidth: "700px",
    background: "#111827",
    borderRadius: "12px",
    color: "white",
    overflowX: "auto",
  },
  heading: {
    marginBottom: "12px",
    fontSize: "1.5rem",
    letterSpacing: "1px",
    textAlign: "center",
  },
  cardsContainer: {
    display: "flex",
    gap: "16px",
    paddingBottom: "10px",
    scrollSnapType: "x mandatory",
    overflowX: "auto",
  },
  card: {
    flex: "0 0 200px",
    background: "#1f2937",
    padding: "16px",
    borderRadius: "8px",
    textAlign: "center",
    scrollSnapAlign: "start",
    cursor: "pointer",
  },
  cardTitle: {
    fontSize: "14px",
    color: "#facc15",
    marginBottom: "8px",
  },
  cardValue: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#34d399",
  },
  scrollHint: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#9ca3af",
    textAlign: "right",
  },
};
