import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

/**
 * ParallaxBackground 컴포넌트
 * 스크롤에 따라 미세한 패럴럭스 효과를 주는 하늘 배경
 *
 * Props:
 * @param {React.ReactNode} children - 배경 위에 렌더링할 자식 요소 [Optional]
 *
 * Example usage:
 * <ParallaxBackground><HeroSection /></ParallaxBackground>
 */
function ParallaxBackground({ children }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* 하늘 그라디언트 배경 */}
      <Box
        sx={{
          position: 'absolute',
          inset: '-10%',
          background: 'linear-gradient(180deg, #87CEEB 0%, #B0DCF0 35%, #D6EEF8 65%, #EEF7FC 85%, #F8FBFF 100%)',
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s linear',
          zIndex: 0,
        }}
      />

      {/* 구름 레이어 1 */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: { xs: 120, md: 220 },
          height: { xs: 40, md: 65 },
          background: 'rgba(255,255,255,0.65)',
          borderRadius: '50px',
          filter: 'blur(10px)',
          transform: `translateY(${scrollY * 0.15}px)`,
          zIndex: 0,
        }}
      />

      {/* 구름 레이어 2 */}
      <Box
        sx={{
          position: 'absolute',
          top: '28%',
          right: '12%',
          width: { xs: 150, md: 280 },
          height: { xs: 50, md: 85 },
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '50px',
          filter: 'blur(14px)',
          transform: `translateY(${scrollY * 0.1}px)`,
          zIndex: 0,
        }}
      />

      {/* 구름 레이어 3 */}
      <Box
        sx={{
          position: 'absolute',
          top: '8%',
          right: '32%',
          width: { xs: 80, md: 160 },
          height: { xs: 30, md: 55 },
          background: 'rgba(255,255,255,0.6)',
          borderRadius: '50px',
          filter: 'blur(8px)',
          transform: `translateY(${scrollY * 0.2}px)`,
          zIndex: 0,
        }}
      />

      {/* 자식 요소 */}
      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
}

export default ParallaxBackground;
