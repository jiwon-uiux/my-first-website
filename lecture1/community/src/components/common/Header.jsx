import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';

/**
 * Header 컴포넌트
 * 전체 페이지 공통 상단 네비게이션 바
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 정보 [Optional, 기본값: null]
 *
 * Example usage:
 * <Header user={{ nickname: '달빛영화팬', profileImageUrl: null }} />
 */
function Header({ user = null }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  if (isLoginPage) return null;

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        backgroundColor: '#142850',
        borderBottom: '1px solid #27496D',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* 로고 */}
        <Typography
          variant='h6'
          onClick={() => navigate('/posts')}
          sx={{
            color: '#B8C6DB',
            fontWeight: 700,
            letterSpacing: '0.05em',
            cursor: 'pointer',
            '&:hover': { color: '#F7F7F7' },
          }}
        >
          🌙 MoonScreen
        </Typography>

        {/* 우측 액션 영역 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant='outlined'
            size='small'
            startIcon={<EditIcon />}
            onClick={() => navigate('/posts/write')}
            sx={{
              borderColor: '#27496D',
              color: '#B8C6DB',
              display: { xs: 'none', sm: 'flex' },
              '&:hover': { borderColor: '#B8C6DB', color: '#F7F7F7', backgroundColor: 'rgba(184,198,219,0.1)' },
            }}
          >
            글쓰기
          </Button>

          <IconButton
            onClick={() => navigate('/posts/write')}
            sx={{ display: { xs: 'flex', sm: 'none' }, color: '#B8C6DB' }}
          >
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => navigate('/profile')} sx={{ p: 0.5 }}>
            <Avatar
              src={user?.profileImageUrl || undefined}
              sx={{ width: 34, height: 34, backgroundColor: '#27496D', fontSize: '0.85rem' }}
            >
              {!user?.profileImageUrl && (user?.nickname?.[0] || '?')}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
