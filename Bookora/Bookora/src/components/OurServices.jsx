import React from "react";
import "../styles/OurServices.css";

const services = [
  {
    title: "Buy Used Books",
    desc: "Browse a vast collection of affordable second-hand books from fellow students.",
    icon: "📚"
  },
  {
    title: "Sell Your Books",
    desc: "List your old books and make space while helping others learn affordably.",
    icon: "💸"
  },
  {
    title: "Exchange with Peers",
    desc: "Swap books with other students nearby and build your learning community.",
    icon: "🔁"
  }
];

const OurServices = () => {
  return (
    <section className="services-section">
      <h2 className="section-title">📖 Our Services</h2>
      <div className="services-list">
        {services.map((service, idx) => (
          <div className="service-card" key={idx}>
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
