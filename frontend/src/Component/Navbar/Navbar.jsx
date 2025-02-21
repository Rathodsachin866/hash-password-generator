import React from "react";
import "./navbar.css";

export default function NeonComponent() {
  return (
    <div className="neon-container">
      <header className="neon-header">
        <div className="neon-logo">NEON</div>
        <nav className="neon-nav">
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#docs">Docs</a></li>
            <li><a href="#use-cases">Use Cases</a></li>
            <li><a href="#resources">Resources</a></li>
            <li><a href="#company">Company</a></li>
          </ul>
        </nav>
        <div className="neon-actions">
          <a href="#github" className="neon-action">15.9k</a>
          <a href="#login" className="neon-action">Log In</a>
          <button className="neon-signup">Sign Up</button>
        </div>
      </header>

      <main className="neon-main">
        <h1>Ship faster with Postgres</h1>
        <p>
          The database you love, on a serverless platform designed to help you
          build reliable and scalable applications faster.
        </p>
        <button className="neon-get-started">Get Started</button>
      </main>
    </div>
  );
}
