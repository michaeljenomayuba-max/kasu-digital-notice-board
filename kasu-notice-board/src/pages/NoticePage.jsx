import { Header } from "./Header";
import "./NoticePage.css";
import "../index.css";

export function NoticePage() {
  return (
    <>
      <title>Notice | KASU Notice Board</title>

      <Header />

      <main class="page">
        <div class="notice-container">
          <div class="notice-card-top">
            <div class="notice-info">
              <h1 class="notice-title">School Resumption Date Announced</h1>
              <p class="notice-date">12 October 2026</p>
            </div>
            <p class="notice-category">General</p>
          </div>
          <div class="notice-text">
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
