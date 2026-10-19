import { Link } from 'react-router';
import { Header } from './Header';
import './AdminDashboard.css';
import "../index.css";

export function AdminDashboard() {
  return (
    <>
      <title>Admin Dashboard | KASU Notice Board</title>

      <Header />

      <main className="page">
        <div className="create-post-container">
          <form className="create-post-form">
            <div className="category-picker">
              <p className="category-picker-label">Category</p>
              <label className="radio-option">
                <input type="radio" name="category" value="general" checked />
                General
              </label>
              <label className="radio-option">
                <input type="radio" name="category" value="nelfund" />
                NELFUND
              </label>
              <label className="radio-option">
                <input type="radio" name="category" value="entertainment" />
                Entertainment
              </label>
              <input
                className="new-category-input"
                type="text"
                name="new-category"
                placeholder="New category name"
                aria-label="New category name"
              />
              <button className="create-category-button" type="button">
                Create Category
              </button>
            </div>

            <div className="form-group">
              <label for="notice-title">Notice title</label>
              <input
                type="text"
                id="notice-title"
                name="notice-title"
                placeholder="Notice title"
              />
            </div>
            <div className="form-group">
              <label for="notice-body">Notice body</label>
              <textarea
                id="notice-body"
                name="notice-body"
                placeholder="Write the notice here"
              ></textarea>
            </div>
            <div className="form-group">
              <label for="notice-image">Upload image</label>
              <input
                type="file"
                id="notice-image"
                name="notice-image"
                accept="image/*"
              />
            </div>
            <label className="checkbox-option">
              <input type="checkbox" name="urgent" />
              Mark notice as urgent
            </label>
            <div className="button-row">
              <button className="post-button" type="submit">
                Post
              </button>
              <Link className="view-all-posts-button" to="/feed">
                View all posts
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
