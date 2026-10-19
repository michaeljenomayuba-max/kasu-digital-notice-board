import { Routes, Route } from 'react-router';
import { AdminDashboard } from './pages/AdminDashboard';
import { FeedPage } from './pages/FeedPage';
import { NoticePage } from './pages/NoticePage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="feed" element={<FeedPage />} />
      <Route path="notice" element={<NoticePage />} />
    </Routes>
  )
}

export default App
