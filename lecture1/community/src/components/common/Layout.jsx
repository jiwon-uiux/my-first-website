import Box from '@mui/material/Box';
import Header from './Header';

/**
 * Layout 컴포넌트
 * Header를 포함한 전체 페이지 공통 레이아웃 래퍼
 *
 * Props:
 * @param {node} children - 페이지 콘텐츠 [Required]
 * @param {object} user - 현재 로그인 사용자 정보 [Optional, 기본값: null]
 *
 * Example usage:
 * <Layout user={currentUser}><PostListPage /></Layout>
 */
function Layout({ children, user = null }) {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0C1E35' }}>
      <Header user={user} />
      <Box component='main' sx={{ flex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
