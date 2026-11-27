import { Routes, Route } from 'react-router';
import { AdminDashboard } from './pages/AdminDashboard';
import { FeedPage } from './pages/FeedPage';
import { NoticePage } from './pages/NoticePage';
import { AdminSignIn } from './pages/AdminSignIn';
import { RequireRole } from './pages/RequireRole';
import { StudentSignUp } from './pages/StudentSignUp';
import { StudentSignIn } from './pages/StudentSignIn';
import { ImagePage } from './pages/ImagePage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="admin-sign-in" element={<AdminSignIn />} />

      <Route index element={<RequireRole allow={["admin"]}><AdminDashboard key="new" /></RequireRole>} />

      <Route path="feed" element={<RequireRole allow={["admin", "student"]}><FeedPage /></RequireRole>} />

      <Route path="notice/:noticeId" element={<RequireRole allow={["admin", "student"]}><NoticePage /></RequireRole>} />

      <Route path="image/:noticeId" element={<RequireRole allow={["admin", "student"]}><ImagePage /></RequireRole>} />

      <Route path="/:noticeId" element={<RequireRole allow={["admin"]}><AdminDashboard key="edit" /></RequireRole>} />

      <Route path="student-sign-up" element={<StudentSignUp />} />

      <Route path="student-sign-in" element={<StudentSignIn />} />
    </Routes>
  );
}

export default App
