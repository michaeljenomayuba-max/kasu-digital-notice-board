import { Link } from "react-router";
import { useNavigate } from "react-router";
import { supabase } from "../assets/lib/supabaseClient";
import { useRole } from "../hook/UseRole";
import KASULOGO from "../assets/images/kasu-logo.png";
import "./Header.css";

export function Header({ searchText, setSearchText, filterNotices }) {
  const navigate = useNavigate();
  const { role } = useRole();

  const logOut = async () => {
    await supabase.auth.signOut();
    if (role === "admin") {
      navigate("/admin-sign-in", { replace: true });
    } else {
      navigate("/student-sign-in", { replace: true });
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        {role === "admin" ? (
          <Link className="logo-link" to="/">
            <img className="logo" src={KASULOGO} />
          </Link>
        ) : (
          <Link className="logo-link" to="/feed">
            <img className="logo" src={KASULOGO} />
          </Link>
        )}

        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            className="search-input"
            type="search"
            name="search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search notices"
            aria-label="Search notices"
          />
          <button className="log-out-button" type="button" onClick={logOut}>
            Log Out
          </button>
        </form>
      </div>
    </header>
  );
}
