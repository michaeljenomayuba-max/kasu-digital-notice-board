import { supabase } from "../assets/lib/supabaseClient";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./NoticePage.css";
import "../index.css";

export function ImagePage() {
  const {noticeId} = useParams();

  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!noticeId) return;

    const fetchNotice = async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("id", noticeId)
        .single();

      if (data) {
        setNotice(data);
        navigate(`/image/${notice.id}`);
      }
      if (error) {
        console.log(error);
      }
    };

    fetchNotice();
  }, [noticeId]);

  return (
    <div className="full-notice-image-div">
      <img className="full-notice-image" src={notice.image_url} alt="" />
    </div>
  );
}
