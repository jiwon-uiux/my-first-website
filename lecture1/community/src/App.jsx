import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritePage from './pages/PostWritePage';
import ProfilePage from './pages/ProfilePage';

/** 임시 로그인 사용자 (Supabase 연동 전 Mock) */
const mockUser = {
  nickname: '달빛영화팬',
  profileImageUrl: null,
};

function App() {
  return (
    <HashRouter>
      <Layout user={mockUser}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/posts' element={<PostListPage />} />
          <Route path='/posts/write' element={<PostWritePage />} />
          <Route path='/posts/:postId' element={<PostDetailPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
