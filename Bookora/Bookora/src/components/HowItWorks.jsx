import React from "react";
import "../styles/HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Browse Books",
      desc: "Search thousands of used books by title, genre, or author near you.",
      icon: "📚",
    },
    {
      title: "2. Connect with Seller",
      desc: "View book details and contact the lister directly in one click.",
      icon: "🤝",
    },
    {
      title: "3. Buy or Exchange",
      desc: "Meet nearby and complete the transaction safely and easily.",
      icon: "💸",
    },
  ];

  return (
    <section className="how-it-works">
      <h2>How Bookora Works</h2>
      <div className="steps">
        {steps.map((step, i) => (
          <div className="step" key={i}>
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
