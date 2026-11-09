import { Link } from 'react-router';
import KASULOGO from '../assets/images/kasu-logo.png'
import './Header.css'

export function Header({searchText, setSearchText, filterNotices}) {
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
          <button className="search-button" type="submit" aria-label="Search" >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
