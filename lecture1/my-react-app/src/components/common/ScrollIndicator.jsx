import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

/**
 * ScrollIndicator 컴포넌트
 * 스크롤 유도 아이콘 (bounce 애니메이션)
 *
 * Props:
 * @param {string} to - 이동할 경로 [Optional, 기본값: '/profile']
 *
 * Example usage:
 * <ScrollIndicator to='/profile' />
 */
function ScrollIndicator({ to = '/profile' }) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(to)}
      sx={{
        position: 'absolute',
        bottom: { xs: 32, md: 48 },
        left: '50%',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        color: '#1A2B4A',
        opacity: 0.7,
        animation: 'scrollBounce 1.5s ease-in-out infinite',
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ fontSize: { xs: '0.65rem', md: '0.72rem' }, letterSpacing: '0.15em', fontWeight: 300 }}>
        SCROLL
      </Box>
      <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} />
    </Box>
  );
}

export default ScrollIndicator;
