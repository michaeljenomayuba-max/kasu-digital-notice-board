import { Header } from "./Header";
import "./Feed.css";
import "../index.css";

export function FeedPage() {
  return (
    <>
      <title>Feed | KASU Notice Board</title>

      <Header />

      <main class="page">
        <div class="categories-container">
          <button class="category-button category-button-active" type="button">
            All
          </button>
          <button class="category-button" type="button">
            General
          </button>
          <button class="category-button" type="button">
            NELFUND
          </button>
          <button class="category-button" type="button">
            Entertainment
          </button>
        </div>

        <div class="notice-list">
          <div class="notice-card">
            <div class="notice-card-top">
              <div class="notice-info">
                <h2 class="notice-title">School Resumption Date Announced</h2>
                <p class="notice-date">12 October 2026</p>
              </div>
              <div class="notice-meta">
                <p class="notice-category">General</p>
                <p class="urgent-text">Urgent</p>
              </div>
            </div>
            <p class="notice-text">
              Management has approved the resumption date for the new semester.
              All students are expected to complete their course registration
              before lectures begin.
            </p>
            <Link class="view-more-button" to="/notice">
              View more
            </Link>
          </div>

          <div class="notice-card">
            <div class="notice-card-top">
              <div class="notice-info">
                <h2 class="notice-title">NELFUND Portal Now Open</h2>
                <p class="notice-date">10 October 2026</p>
              </div>
              <div class="notice-meta">
                <p class="notice-category">NELFUND</p>
              </div>
            </div>
            <p class="notice-text">
              Eligible students can now apply for the student loan through the
              official portal. Keep your matric number and a valid bank account
              ready.
            </p>
            <a class="view-more-button" href="notice.html">
              View more
            </a>
          </div>

          <div class="notice-card">
            <div class="notice-card-top">
              <div class="notice-info">
                <h2 class="notice-title">Inter-Faculty Cultural Night</h2>
                <p class="notice-date">8 October 2026</p>
              </div>
              <div class="notice-meta">
                <p class="notice-category">Entertainment</p>
              </div>
            </div>
            <p class="notice-text">
              The student union invites everyone to the annual cultural night.
              Expect music, drama and food from every faculty. Entry is free for
              all students.
            </p>
            <a class="view-more-button" href="notice.html">
              View more
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
