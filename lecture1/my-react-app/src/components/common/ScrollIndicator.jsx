import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * ScrollIndicator 컴포넌트
 * 스크롤 유도 아이콘 (bounce 애니메이션)
 *
 * Example usage:
 * <ScrollIndicator />
 */
function ScrollIndicator() {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: 32, md: 48 },
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        color: '#1A2B4A',
        opacity: 0.7,
        animation: 'scrollBounce 1.5s ease-in-out infinite',
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
