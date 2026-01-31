🧠 Intent-Aware UI (Behavior-Driven UX in React)

An experimental React project that infers a user’s intent in real-time while filling a form. The system detects whether a user is Confident, Exploring, Confused, or Rushing by analyzing micro-behaviors such as focus duration, hover hesitation, and re-edits — and dynamically adapts the UI with hints, colors, and visual feedback.

This project explores the intersection of UX engineering, behavioral analytics, and frontend intelligence.

✨ Features

Behavior Tracking

Tracks time spent per input field

Measures hover duration (hesitation)

Counts meaningful re-edits after the user leaves a field

Intent Classification

Rule-based inference engine

Memoized for performance

Detects:

✅ Confident

👀 Exploring

😕 Confused

⚡ Rushing

Adaptive UI

Dynamic colors and hints based on intent

Visual feedback that reacts to user behavior

Developer-Friendly Architecture

Modular React hooks

Clean separation between logic and UI

Easy to extend for ML-based intent prediction

🏗️ Project Structure
src/
 ├─ hooks/
 │   ├─ useFieldTiming.js        # Tracks focus time per field
 │   ├─ useHoverTracker.js       # Tracks hover hesitation
 │   ├─ useReEditTracker.js      # Tracks meaningful re-edits
 │   └─ useIntentClassifier.js   # Infers user intent
 ├─ App.jsx                      # Main intent-aware form
 └─ index.js

🧪 How It Works

The intent is determined by analyzing:

Signal	Meaning
Average Focus Time	Cognitive effort spent per field
Re-edits Count	User corrections after leaving a field
Maximum Hover	Hesitation or indecision
Combined Signals	Overall user intent

Intent Classification Rules (Simplified):

Confused → High time, many re-edits, long hover

Rushing → Very low time, no re-edits

Confident → Moderate time, minimal corrections

Exploring → Any other combination

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/intent-aware-ui.git
cd intent-aware-ui

2️⃣ Install Dependencies
npm install

3️⃣ Run the App
npm start


Open http://localhost:3000
 to view it in your browser.

🛠️ Tech Stack

React.js

Custom React Hooks

JavaScript (ES6+)

Inline Styling (UI logic focused)

No external UI libraries — the intelligence is in the behavior tracking and intent engine.

🎯 Use Cases

UX research & experimentation

Intelligent onboarding forms

Adaptive interfaces for human-computer interaction (HCI)

Portfolio projects demonstrating advanced frontend skills

🔮 Future Enhancements

📊 Analytics dashboard (charts & heatmaps)

🤖 Machine-learning based intent prediction

🎥 Session replay & interaction recording

🧪 A/B testing for adaptive UI designs

🧑‍💻 Author

Isha Saleem
Frontend Developer | UX-Focused Engineer

Building interfaces that understand users, not just collect input.

⭐ Why This Project Matters

Most forms focus on what users type.
This project focuses on how users behave while typing — adapting the interface intelligently to improve user experience.
