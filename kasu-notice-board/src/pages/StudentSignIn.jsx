import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../assets/lib/supabaseClient";
import KASULOGO from "../assets/images/kasu-logo.png";
import "./StudentSignPages.css";
import "../index.css";

export function StudentSignIn() {
  const navigate = useNavigate();
  const [matricNumber, setMatricNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const signIn = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setErrorMessage("Invalid details. Please check them and try again.");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select()
      .eq('id', data.user.id)
      .single();

    const matric = matricNumber.trim().toUpperCase();

    if (profile?.role !== 'student' || profile?.login_number !== matric) {
      await supabase.auth.signOut();
      setErrorMessage("Invalid details. Please check them and try again.");
      return;
    }

    navigate('/feed', {replace: true});
  }

  return (
    <main className="sign-page">
      <div className="auth-card">
        <div className="logo-container">
          <img className="sign-page-logo" src={KASULOGO} alt="KASU logo" />
        </div>
        <p className="welcome-text">Welcome to the KASU Notice Board</p>
        <h1 className="auth-title">Sign in</h1>
        <form className="auth-form" onSubmit={signIn}>
          <div className="form-group">
            <label htmlFor="matric-number">Matric number</label>
            <input
              type="text"
              id="matric-number"
              name="matric-number"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              placeholder="KASU/YY/DEPT/NN"
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
            />
          </div>
          <button className="auth-button" type="submit">
            Sign in
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <p className="auth-switch">
          Don't have an account? <Link to="/student-sign-up">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
