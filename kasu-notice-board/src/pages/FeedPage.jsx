import { Header } from "./Header";
import { supabase } from "../assets/lib/supabaseClient";
import { NoticeCard } from "./components/NoticeCard";
import { FeedCategories } from "./components/FeedCategories";
import { useState, useEffect } from "react";
import "./Feed.css";
import "../index.css";

export function FeedPage() {
  const [fetchError, setFetchError] = useState(null);
  const [notices, setNotices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select();

      setCategories(data);
    };

    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from("notices")
        .select(
          `*,
          categories(name)
          `,
        )
        .order("created_at", { ascending: false });

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
    fetchCategories();

    const noticesChannel = supabase
      .channel("notices-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notices",
        },
        () => {
          fetchNotices();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "categories",
        },
        () => {
          fetchCategories();
          fetchNotices();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(noticesChannel);
    };
  }, []);

  const visibleNotices = notices.filter((notice) => {
    const categoryOk =
      selectedCategory === "All" ||
      notice.categories?.name === selectedCategory;
    const searchOk =
      searchText === "" ||
      notice.title.toLowerCase().includes(searchText.toLowerCase()) ||
      notice.body.toLowerCase().includes(searchText.toLowerCase());
    return categoryOk && searchOk;
  });

  return (
    <>
      <title>Feed | KASU Notice Board</title>

      <Header searchText={searchText} setSearchText={setSearchText} />

      <main className="page">
        <FeedCategories
          categories={categories}
          setSelectedCategory={setSelectedCategory}
        />

        {fetchError && (
          <p>
            We're experiencing some technical issues please refresh the page or
            try again later
            <br />
            Thanks for using KASU notice board
          </p>
        )}

        <NoticeCard
          notices={notices}
          setNotices={setNotices}
          filteredNotices={visibleNotices}
        />
      </main>
    </>
  );
}
