import { Link } from 'react-router';
import { useNavigate } from "react-router";
import { supabase } from "../assets/lib/supabaseClient";
import KASULOGO from '../assets/images/kasu-logo.png'
import './Header.css'

export function Header({searchText, setSearchText, filterNotices}) {
  const navigate = useNavigate();

  const logOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin-sign-in", {replace: true})
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link className="logo-link" to="/">
          <img className="logo" src={KASULOGO} />
        </Link>
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            className="search-input"
            type="search"
            name="search"
            value={searchText}
            onChange={(e) => {setSearchText(e.target.value)}}
            placeholder="Search notices"
            aria-label="Search notices"
          />
          <button className='log-out-button' onClick={logOut}>Log Out</button>
        </form>
      </div>
    </header>
  );
}
