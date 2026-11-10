import { Routes, Route } from 'react-router';
import { AdminDashboard } from './pages/AdminDashboard';
import { FeedPage } from './pages/FeedPage';
import { NoticePage } from './pages/NoticePage';
import { AdminSignIn } from './pages/AdminSignIn';
import { RequireAdmin } from './pages/RequireAdmin';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="admin-sign-in" element={<AdminSignIn />} />
      <Route index element={<RequireAdmin><AdminDashboard key="new" /></RequireAdmin>} />
      <Route path="feed" element={<FeedPage />} />
      <Route path="notice/:noticeId" element={<NoticePage />} />
      <Route path="/:noticeId" element={<RequireAdmin><AdminDashboard key="edit" /></RequireAdmin>} />
    </Routes>
  );
}

export default App
