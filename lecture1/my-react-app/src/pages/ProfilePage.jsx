import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileInfo from '../components/profile/ProfileInfo';
import profileImg from '../assets/profile.jpg';

/**
 * ProfilePage
 * 2페이지: 글래스모피즘 프로필 카드 + 정보
 * 페이지 최상단에서 위로 스크롤 시 1페이지(/)로 이동
 */
function ProfilePage() {
  const navigate = useNavigate();
  const touchStartY = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (window.scrollY === 0 && e.deltaY < 0) {
        navigate('/');
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (window.scrollY === 0 && deltaY < -30) {
        navigate('/');
      }
      touchStartY.current = null;
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(135deg, #EEF7FC 0%, #D6EEF8 40%, #B0DCF0 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 6, md: 8 },
      }}
    >
      {/* 스크롤 위로 유도 아이콘 */}
      <Box
        onClick={() => document.getElementById('landing')?.scrollIntoView({ behavior: 'smooth' })}
        sx={{
          position: 'absolute',
          top: { xs: 20, md: 32 },
          left: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          color: '#1A2B4A',
          opacity: 0.7,
          animation: 'scrollBounceUp 1.5s ease-in-out infinite',
          cursor: 'pointer',
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} />
        <Box sx={{ fontSize: { xs: '0.65rem', md: '0.72rem' }, letterSpacing: '0.15em', fontWeight: 300 }}>
          SCROLL
        </Box>
      </Box>
      <Container maxWidth='md'>
        {/* 글래스모피즘 카드 */}
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 6,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 16px 48px rgba(135, 206, 235, 0.2)',
            overflow: 'hidden',
            p: { xs: 2, md: 4 },
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: '0 28px 64px rgba(135, 206, 235, 0.35)',
            },
          }}
        >
          <Grid container spacing={2} alignItems='center'>
            <Grid size={{ xs: 12, md: 5 }}>
              {/* 프로필 사진: imageSrc에 이미지 경로를 입력하세요 (예: '/profile.jpg') */}
              <ProfileCard
                imageSrc={profileImg}
                imageAlt='프로필 사진'
              />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <ProfileInfo
                name='김지원'
                intro='성장하는 웹퍼블리셔입니다'
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default ProfilePage;
