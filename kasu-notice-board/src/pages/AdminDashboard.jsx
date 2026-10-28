import { useState } from 'react';
import { supabase } from '../assets/lib/supabaseClient';
import { Link, useNavigate } from 'react-router';
import { Header } from './Header';
import {CreateCategories} from './components/CreateCategories';
import './AdminDashboard.css';
import "../index.css";

export function AdminDashboard() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [formError, setFormError] = useState(null);

  

  const createPost = async (e) => {
    e.preventDefault();

    if (!category || !body || !title) {
      setFormError("Please fill in all the fields");
      return;
    }

    const {data, error} = await supabase
      .from('notices')
      .insert([{category_id: category, title, body, urgent, image_url: imageUrl}])
      .select();

     if (error) {
      setFormError("Please fill in all necessary fields: category title and body")
     } 

    if (data) {
      setFormError(null)
      navigate('/feed');
     } 

  }

  return (
    <>
      <title>Admin Dashboard | KASU Notice Board</title>

      <Header />

      <main className="page">
        <div className="create-post-container">
          
          <form className="create-post-form" onSubmit={createPost}>

            <CreateCategories setCategory={setCategory} />

            <div className="form-group">
              <label for="notice-title">Notice title</label>
              <input
                type="text"
                id="notice-title"
                name="notice-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notice title"
              />
            </div>
            <div className="form-group">
              <label for="notice-body">Notice body</label>
              <textarea
                id="notice-body"
                name="notice-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write the notice here"
              ></textarea>
            </div>
            <div className="form-group">
              <label for="notice-image">Upload image</label>
              <input
                type="file"
                id="notice-image"
                name="notice-image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                accept="image/*"
              />
            </div>
            <label className="checkbox-option">
              <input
               type="checkbox"
               name="urgent"
               onChange={(e) => setUrgent(e.target.checked)}
               value={urgent}
              />
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

            {formError && <p>{formError}</p>}
          </form>
        </div>
      </main>
    </>
  );
};
