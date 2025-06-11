import { useState } from "react";
import "./index.css";
// This is a simple quiz app that helps users find their brand style
const questions = [
  {
    type: "dropdown",
    question: "Your business is best described as:",
    options: [
      "A service-based business",
      "A product-based business",
      "A combination of both",
      "A creative or artistic venture",
      "A tech or digital business",
      "A non-profit or community-focused organization"
    ]
  },
  {
    type: "radio",
    question: "Words that describe your brand’s personality.",
    options: [
      "Fun, bold, playful",
      "Classic, elevated, timeless",
      "Natural, grounded, earthy",
      "Elegant, charming, luxurious",
      "Simple, modern, minimal",
      "Sophisticated, professional, refined"
    ]
  },
  {
    type: "image-select",
    question: "Your favorite font style.",
    options: [
      "/assets/font-1-sans-serif.png",
      "/assets/font-2-serif.png",
      "/assets/font-3-cursiv.png",
      "/assets/font-4-classic.png",
      "/assets/font-5-decorative.png",
      "/assets/font-6-playful.png"
    ]
  },
  {
    type: "image-select",
    question: "Your favorite color palette.",
    options: [
      "/assets/color-palette-1-warm-natural.png",
      "/assets/color-palette-2-retro-colorfull.png",
      "/assets/color-palette-3-cool-professional.png",
      "/assets/color-palette-4-neutral-calm.png",
      "/assets/color-palette-5-bright-playful.png",
      "/assets/color-palette-6-warm-feminime.png"
    ]
  }
];

export const App = () => {
  const [step, setStep] = useState(0);           // Current question
  const [answers, setAnswers] = useState([]);    // Saves answers
  const [name, setName] = useState("");          // User's name
  const [started, setStarted] = useState(false); // Has the quiz started?
  const [submitted, setSubmitted] = useState(false); // Has the quiz ended?
  // Handles the answer selection and moves to the next question or submits the quiz
  const handleAnswer = (value) => {
    const updated = [...answers];
    updated[step] = value;
    setAnswers(updated);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setSubmitted(true), 300);
    }
  };
  // Renders the current question based on its type
  // and displays the appropriate input elements
  const renderQuestion = () => {
    const { type, options } = questions[step];
    const value = answers[step];

    if (type === "radio") {
      return (
        <div className="options">
          {options.map((opt, i) => (
            <label key={i} className="radio">
              <input
                type="radio"
                name={`radio-${step}`}
                value={opt}
                checked={value === opt}
                onChange={() => handleAnswer(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      );
    }
    // Handles dropdown selection and image selection
    // For dropdown, it uses a select element
    if (type === "dropdown") {
      return (
        <select
          className="dropdown"
          value={value || ""}
          onChange={(e) => handleAnswer(e.target.value)}
        >
          <option value="" disabled>Select an option</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    // For image selection, it displays a grid of images
    // Each image is wrapped in a label with a checkbox input
    if (type === "image-select") {
      return (
        <div className="image-grid">
          {options.map((src, i) => (
            <label
              key={i}
              className={`image-option ${value === src ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={value === src}
                onChange={() => handleAnswer(src)}
              />
              <img src={src} alt={`Option ${i + 1}`} />
            </label>
          ))}
        </div>
      );
    }
    // If the question type is not recognized, return null
    return null;
  };
  // Resets the quiz state to start over and clears answers and name
  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setName("");
    setStarted(false);
    setSubmitted(false);
  };
  // If the quiz hasn't started, show the start screen with a name input
  // and a button to start the quiz
  if (!started) {
    return (
      <div className="quiz start-screen">
        <h1>Welcome to the Brand Style Quiz</h1>
        <h4>Please enter your name:</h4>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />
        <button onClick={() => setStarted(true)} disabled={!name}>
          Start Quiz
        </button>
      </div>
    );
  }
  // If the quiz has been submitted, show the summary of answers
  // It displays the user's name and a list of their answers
  if (submitted) {
    return (
      <div className="quiz">
        <h1>Hej {name}, this is your brand style:</h1>
        <h2>Here’s a summary of your answers:</h2>
        <ul>
          {questions.map((q, i) => (
            <li key={i}>
              <strong>{q.question}</strong><br />
              {typeof answers[i] === "string" && answers[i].startsWith("/assets/") ? (
                <img src={answers[i]} alt="Selected" className="summary-img" />
              ) : (
                answers[i]
              )}
            </li>
          ))}
        </ul>
        <button className="restart-button" onClick={resetQuiz}>
          Start Again
        </button>
      </div>
    );
  }
  // If the quiz is in progress, render the current question
  // It shows the question text, a progress bar, and the answer options
  return (
    <div className="quiz">
      <h1>What's Your Brand Style?</h1>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>
      <h2>{questions[step].question}</h2>
      {renderQuestion()}
      {step > 0 && (
        <div className="actions">
          <button onClick={() => setStep(step - 1)} className="back-button">
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};
