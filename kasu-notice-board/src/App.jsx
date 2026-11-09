import { Routes, Route } from 'react-router';
import { AdminDashboard } from './pages/AdminDashboard';
import { FeedPage } from './pages/FeedPage';
import { NoticePage } from './pages/NoticePage';
import {  }
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element={<AdminDashboard key="new" />} />
      <Route path="feed" element={<FeedPage />} />
      <Route path="notice/:noticeId" element={<NoticePage />} />
      <Route path="/:noticeId" element={<AdminDashboard key="edit" />} />
    </Routes>
  );
}

export default App
