import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * HeroSection 컴포넌트
 * 1페이지 중앙 정렬 Hero 텍스트 섹션
 * PORTFOLIO 텍스트 fade-up 애니메이션, 서브 문구 딜레이 등장
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        component='h1'
        sx={{
          fontSize: { xs: '2.8rem', sm: '4rem', md: '6rem' },
          fontWeight: 700,
          letterSpacing: { xs: '0.2em', md: '0.35em' },
          color: '#1A2B4A',
          lineHeight: 1.1,
          animation: 'fadeUp 1s ease-out both',
          animationDelay: '0.2s',
        }}
      >
        PORTFOLIO
      </Typography>

      <Typography
        component='p'
        sx={{
          mt: { xs: 2, md: 3 },
          fontSize: { xs: '0.95rem', md: '1.15rem' },
          fontWeight: 300,
          letterSpacing: { xs: '0.1em', md: '0.2em' },
          color: '#4A6580',
          animation: 'fadeUp 1s ease-out both',
          animationDelay: '0.7s',
        }}
      >
        성장하는 웹퍼블리셔입니다
      </Typography>

      <Box
        sx={{
          mt: { xs: 3, md: 4 },
          width: { xs: 40, md: 60 },
          height: '1px',
          backgroundColor: '#87CEEB',
          animation: 'fadeUp 1s ease-out both',
          animationDelay: '1.1s',
        }}
      />
    </Box>
  );
}

export default HeroSection;
