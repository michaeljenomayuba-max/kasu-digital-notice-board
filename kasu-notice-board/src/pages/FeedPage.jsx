import { Header } from "./Header";
import { supabase } from "../assets/lib/supabaseClient";
import { NoticeCard } from "./components/NoticeCard";
import { useState, useEffect } from "react";
import "./Feed.css";
import "../index.css";

export function FeedPage() {
  const [fetchError, setFetchError] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from('notices')
        .select(`*,
          categories(name)
          `);

      if (error) {
        setFetchError("unable to fetch notices");
        console.log(error);
      }
      if (data) {
        setNotices(data);
        setFetchError(null);
      }
    };

    fetchNotices();
  }, []);

  return (
    <>
      <title>Feed | KASU Notice Board</title>

      <Header />

      <main className="page">
        <div className="categories-container">
          <button className="category-button category-button-active" type="button">
            All
          </button>
          <button className="category-button" type="button">
            General
          </button>
          <button className="category-button" type="button">
            NELFUND
          </button>
          <button className="category-button" type="button">
            Entertainment
          </button>
        </div>
        {fetchError && (
          <p>
            We're experiencing some technical issues please refresh the page or
            try again later
            <br />
            Thanks for using KASU notice board
          </p>
        )}   

        <NoticeCard notices={notices} />
      </main>
    </>
  );
}
