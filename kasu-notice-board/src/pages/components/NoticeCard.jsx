import dayjs from 'dayjs';
import { Link } from "react-router";

export function NoticeCard({notices}) {
  return (
    <div className="notice-list">
      {notices.map((notice) => {
        return (
          <div key={notice.id} className="notice-card">
            <div className="notice-card-top">
              <div className="notice-info">
                <h2 className="notice-title">{notice.title}</h2>
                <p className="notice-date">
                  {dayjs(notice.created_at).format("MMMM, D, YYYY")}
                </p>
              </div>
              <div className="notice-meta">
                <p className="notice-category">{notice.categories?.name}</p>
                <p className="urgent-text">{notice.urgent ? "Urgent" : ""}</p>
              </div>
            </div>
            <p className="notice-text">{notice.body}</p>
            <Link className="view-more-button" to="/notice">
              View more
            </Link>
          </div>
        );
      })}
    </div>
  );
}
