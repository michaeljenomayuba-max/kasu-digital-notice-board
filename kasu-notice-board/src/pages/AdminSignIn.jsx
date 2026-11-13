import { supabase } from "../assets/lib/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router";
import KASULOGO from "../assets/images/kasu-logo.png";
import "./AdminSignIn.css";
import "../index.css";

export function AdminSignIn() {
  const navigate = useNavigate();
  const [adminNumber, setAdminNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const signIn = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error){
      setErrorMessage("Invalid details. Please check them and try again");
      return;
    }

    const {data: profile} = await supabase
      .from('profiles')
      .select()
      .eq('id', data.user.id)
      .single();

    if (profile?.role !=='admin' || profile?.login_number !== adminNumber) {
      await supabase.auth.signOut();
      setErrorMessage("Invalid details. Please check them and try again.");
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <main className="sign-page">
      <div className="auth-card">
        <div className="sign-in-logo-container">
          <img className="sign-in-logo" src={KASULOGO} alt="KASU Logo" />
        </div>
        <form className="auth-form" onSubmit={signIn}>
          <div className="form-group">
            <label htmlhtmlFor="admin-number">Admin number</label>
            <input
              type="text"
              id="admin-number"
              name="admin-number"
              value={adminNumber}
              onChange={(e) => setAdminNumber(e.target.value)}
              placeholder="Admin number"
            />
          </div>
          <div className="form-group">
            <label htmlhtmlFor="email">Email</label>
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
            <label htmlhtmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="auth-button">
            Sign in
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </main>
  );
}
