import { useState, useEffect } from "react";
import { supabase } from "../assets/lib/supabaseClient";
import { Link, useNavigate, useParams } from "react-router";
import { Header } from "./Header";
import { CreateCategories } from "./components/CreateCategories";
import "./AdminDashboard.css";
import "../index.css";

export function AdminDashboard() {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const isEditing = Boolean(noticeId);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [urgent, setUrgent] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!noticeId) return;

    const fetchNotice = async () => {
      const { data, error } = await supabase
        .from("notices")
        .select()
        .eq("id", noticeId)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setCategory(data.category_id);
        setTitle(data.title);
        setBody(data.body);
        setUrgent(data.urgent);
      }
    };

    fetchNotice();
  }, [noticeId, navigate]);

  const createPost = async (e) => {
    e.preventDefault();

    if (!category || !body || !title) {
      setFormError("Please fill in all the fields");
      return;
    }

    let imageAddress = null;

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      await supabase.storage.from("notice-images").upload(fileName, imageFile);

      const { data: urlData } = supabase.storage
        .from("notice-images")
        .getPublicUrl(fileName);

      imageAddress = urlData.publicUrl;
    }

    const fields = { category_id: category, title, body, urgent };

    const { data, error } = isEditing
      ? await supabase
          .from("notices")
          .update(fields)
          .eq("id", noticeId)
          .select()
      : await supabase
          .from("notices")
          .insert([
            { category_id: category, title, body, urgent, image_url: imageAddress },
          ])
          .select();

    if (error) {
      setFormError(
        "Please fill in all necessary fields: category title and body",
      );
    }

    if (data) {
      setFormError(null);
      navigate("/feed");
    }

  };

  return (
    <>
      <title>Admin Dashboard | KASU Notice Board</title>

      <Header />

      <main className="page">
        <div className="create-post-container">
          <form className="create-post-form" onSubmit={createPost}>
            <CreateCategories category={category} setCategory={setCategory} />

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
                onChange={(e) => setImageFile(e.target.files[0])}
                accept="image/*"
              />
            </div>
            <label className="checkbox-option">
              <input
                type="checkbox"
                name="urgent"
                onChange={(e) => setUrgent(e.target.checked)}
                checked={urgent}
              />
              Mark notice as urgent
            </label>
            <div className="button-row">
              <button className="post-button" type="submit">
                {isEditing ? "Save Post" : "Post"}
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
}
