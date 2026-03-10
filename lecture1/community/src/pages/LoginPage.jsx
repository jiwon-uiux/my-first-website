import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

/**
 * LoginPage 컴포넌트
 * MoonScreen 로그인 페이지
 * 소셜 로그인 버튼, 한 줄 카피, 별빛 배경 포함
 */
function LoginPage() {
  const navigate = useNavigate();

  /** 소셜 로그인 클릭 핸들러 (Phase 2: 실제 OAuth 연동 예정) */
  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    navigate('/posts');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0C1E35 0%, #142850 60%, #0C1E35 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 별빛 효과 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(184, 198, 219, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(39, 73, 109, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth='xs' sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            p: { xs: 3, md: 4 },
            backgroundColor: 'rgba(20, 40, 80, 0.85)',
            borderRadius: 3,
            border: '1px solid #27496D',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* 로고 영역 */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h4'
              sx={{ fontWeight: 700, color: '#B8C6DB', letterSpacing: '0.1em', mb: 0.5 }}
            >
              🌙 MoonScreen
            </Typography>
            <Typography variant='body2' sx={{ color: '#B8C6DB', opacity: 0.7, fontSize: '0.85rem' }}>
              영화와 드라마, 별빛 아래 함께 이야기해요
            </Typography>
          </Box>

          <Divider sx={{ width: '100%', borderColor: '#27496D' }} />

          {/* 소셜 로그인 버튼 */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              fullWidth
              variant='contained'
              onClick={() => handleSocialLogin('kakao')}
              sx={{ backgroundColor: '#FEE500', color: '#000', '&:hover': { backgroundColor: '#F0D800' }, py: 1.5 }}
            >
              카카오로 시작하기
            </Button>
            <Button
              fullWidth
              variant='contained'
              onClick={() => handleSocialLogin('naver')}
              sx={{ backgroundColor: '#03C75A', color: '#fff', '&:hover': { backgroundColor: '#02A84A' }, py: 1.5 }}
            >
              네이버로 시작하기
            </Button>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => handleSocialLogin('google')}
              sx={{
                borderColor: '#B8C6DB',
                color: '#B8C6DB',
                '&:hover': { borderColor: '#F7F7F7', color: '#F7F7F7', backgroundColor: 'rgba(184,198,219,0.1)' },
                py: 1.5,
              }}
            >
              Google로 시작하기
            </Button>
          </Box>

          <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.5, textAlign: 'center' }}>
            로그인 시 서비스 이용약관 및 개인정보처리방침에 동의합니다
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
