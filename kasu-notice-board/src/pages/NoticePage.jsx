import { Header } from "./Header";
import "./NoticePage.css";
import "../index.css";

export function NoticePage() {
  return (
    <>
      <title>Notice | KASU Notice Board</title>

      <Header />

      <main className="page">
        <div className="notice-container">
          <div className="notice-card-top">
            <div className="notice-info">
              <h1 className="notice-title">School Resumption Date Announced</h1>
              <p className="notice-date">12 October 2026</p>
            </div>
            <p className="notice-category">General</p>
          </div>
          <div className="notice-text">
            <p>
              Management has approved the resumption date for the new semester.
              All students are expected to complete their course registration
              before lectures begin.
            </p>
            <p>
              Students who have not paid their school fees should do so before
              the registration deadline. Any student with a problem should visit
              the registry with their matric number.
            </p>
            <p>
              Further updates will be posted on this notice board as they become
              available.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
