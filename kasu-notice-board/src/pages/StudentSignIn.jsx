import { useState } from "react";
import { Link } from "react-router";
import KASULOGO from "../assets/images/kasu-logo.png";
import './StudentSignPages.css';
import "../index.css";

export function StudentSignIn() {
    const [matricNumber, setMatricNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <main class="sign-page">
      <div class="auth-card">
        <div class="logo-container">
          <img class="logo" src={KASULOGO} alt="KASU logo" />
        </div>
        <p class="welcome-text">Welcome to the KASU Notice Board</p>
        <h1 class="auth-title">Sign in</h1>
        <form class="auth-form" action="feed.html">
          <div class="form-group">
            <label for="matric-number">Matric number</label>
            <input
              type="text"
              id="matric-number"
              name="matric-number"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              placeholder="KASU/YY/DEPT/NN"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button class="auth-button" type="submit">
            Sign in
          </button>
        </form>
        <p class="auth-switch">
          Don't have an account? <Link to="/student-sign-up">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
