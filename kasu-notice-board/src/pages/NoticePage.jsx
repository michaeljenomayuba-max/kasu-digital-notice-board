import dayjs from 'dayjs';
import { Header } from "./Header";
import { supabase } from "../assets/lib/supabaseClient";
import {  Link, useParams } from "react-router";
import { useState, useEffect } from 'react';
import "./NoticePage.css";
import "../index.css";

export function NoticePage() {
  const { noticeId } = useParams();

  const [notice, setNotices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      if (!noticeId) return;
  
      const fetchNotice = async () => {
        const { data, error } = await supabase
          .from("notices")
          .select(`*,
          categories(name)
          `)
          .eq("id", noticeId)
          .single();

        if (data) {
          setNotices(data);
        }
        if (error) {
          console.log(error);
        }
      };
  
      fetchNotice();
    }, [noticeId]);

  return (
    <>
      <title>Notice | KASU Notice Board</title>

      <Header />

      <main className="page">
        <div className="notice-container">
          <div className="notice-card-top">
            <div className="notice-info">
              <h1 className="notice-title">{notice.title}</h1>
              <p className="notice-date">{dayjs(notice.created_at).format("MMMM, D, YYYY")}</p>
            </div>
            <p className="notice-category">{notice.categories?.name}</p>
          </div>
          <div className="full-notice-text">
            {notice.body}
          </div>
          <Link className="back-button" to="/feed">Back</Link>
        </div>
      </main>
    </>
  );
}
