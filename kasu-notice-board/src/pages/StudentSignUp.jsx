import { useState } from "react";
import { supabase } from "../assets/lib/supabaseClient";
import { Link, useNavigate } from "react-router";
import KASULOGO from "../assets/images/kasu-logo.png";
import "./StudentSignPages.css";
import "../index.css";

export function StudentSignUp() {
  const navigate = useNavigate();
  const [matricNumber, setMatricNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const signUp = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const matric = matricNumber.trim().toUpperCase();
    const matricPattern = /^KASU\/\d{2}\/[A-Z]{2,4}\/\d{3,5}$/;

    if (!matricPattern.test(matric)) {
      setErrorMessage(
        "Please enter your matric number in this format KASU/YY/DEPT/NNNN.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { login_number: matric },
        emailRedirectTo: 'https://kasu-digital-notice-board.vercel.app/student-sign-in',
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (data.session) {
      navigate("/feed", { replace: true });
    } else {
      setErrorMessage(
        "Account created. Check your email to confirm it, then sign in.",
      );
    }
  };

  return (
    <main className="sign-page">
      <div className="auth-card">
        <div className="logo-container">
          <img className="sign-page-logo" src={KASULOGO} alt="KASU logo" />
        </div>
        <p className="welcome-text">Welcome to the KASU Notice Board</p>
        <h1 className="auth-title">Sign up</h1>
        <form className="auth-form" onSubmit={signUp}>
          {errorMessage && <p>{errorMessage}</p>}
          <div className="form-group">
            <label htmlFor="matric-number">Matric number</label>
            <input
              type="text"
              id="matric-number"
              name="matric-number"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              placeholder="KASU/YY/DEPT/NN"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>
          <button className="auth-button" type="submit">
            Sign up
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/student-sign-in">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
