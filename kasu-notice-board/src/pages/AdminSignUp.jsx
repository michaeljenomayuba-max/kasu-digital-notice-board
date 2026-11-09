import './AdminSignUp.css'
import "../index.css";

export function AdminSignUp() {
  return (
    <div class="auth-card">
      <div class="logo-container">
        <img class="logo" src="images/kasu-logo.png" alt="KASU logo" />
      </div>
      <form class="auth-form" action="admin-dashboard.html">
        <div class="form-group">
          <label for="admin-number">Admin number</label>
          <input
            type="text"
            id="admin-number"
            name="admin-number"
            placeholder="Admin number"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button class="auth-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
