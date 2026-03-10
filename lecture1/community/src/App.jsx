import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';

/** 임시 로그인 사용자 (Phase 2 인증 구현 전 Mock) */
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
          <Route path='/posts/:postId' element={<PostDetailPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
