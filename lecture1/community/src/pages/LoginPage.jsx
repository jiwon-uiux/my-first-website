import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import NicknameModal from '../components/ui/NicknameModal';

/**
 * LoginPage 컴포넌트
 * 로그인 / 회원가입 탭 전환, 소셜 로그인, 이메일 로그인/가입 지원
 * 회원가입 완료 시 닉네임 설정 모달 표시
 */
function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [showNicknameModal, setShowNicknameModal] = useState(false);

  /** 소셜 로그인 → 바로 메인으로 이동 */
  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인`);
    navigate('/posts');
  };

  /** 이메일 로그인 */
  const handleEmailLogin = () => {
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return; }
    navigate('/posts');
  };

  /** 이메일 회원가입 → 닉네임 설정 모달 */
  const handleRegister = () => {
    if (!email || !password || !passwordConfirm) { setError('모든 항목을 입력해주세요.'); return; }
    if (password !== passwordConfirm) { setError('비밀번호가 일치하지 않습니다.'); return; }
    if (password.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return; }
    setError('');
    setShowNicknameModal(true);
  };

  /** 닉네임 확정 → 메인으로 이동 */
  const handleNicknameConfirm = (nickname) => {
    console.log('닉네임 설정:', nickname);
    setShowNicknameModal(false);
    navigate('/posts');
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#0C1E35',
      color: '#F7F7F7',
      '& fieldset': { borderColor: '#27496D' },
      '&:hover fieldset': { borderColor: '#B8C6DB' },
      '&.Mui-focused fieldset': { borderColor: '#B8C6DB' },
    },
    '& .MuiInputBase-input::placeholder': { color: '#B8C6DB', opacity: 0.5 },
    '& .MuiInputLabel-root': { color: '#B8C6DB' },
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
          inset: 0,
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(184,198,219,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(39,73,109,0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth='xs' sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2.5,
            p: { xs: 3, md: 4 },
            backgroundColor: 'rgba(20,40,80,0.85)',
            borderRadius: 3,
            border: '1px solid #27496D',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* 로고 */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h4' sx={{ fontWeight: 700, color: '#B8C6DB', letterSpacing: '0.1em', mb: 0.5 }}>
              🌙 MoonScreen
            </Typography>
            <Typography variant='body2' sx={{ color: '#B8C6DB', opacity: 0.7, fontSize: '0.85rem' }}>
              영화와 드라마, 별빛 아래 함께 이야기해요
            </Typography>
          </Box>

          {/* 탭: 로그인 / 회원가입 */}
          <Tabs
            value={tab}
            onChange={(e, v) => { setTab(v); setError(''); }}
            variant='fullWidth'
            sx={{
              width: '100%',
              '& .MuiTab-root': { color: '#B8C6DB', textTransform: 'none', fontWeight: 500 },
              '& .Mui-selected': { color: '#F7F7F7', fontWeight: 700 },
              '& .MuiTabs-indicator': { backgroundColor: '#B8C6DB' },
            }}
          >
            <Tab label='로그인' />
            <Tab label='회원가입' />
          </Tabs>

          {/* 소셜 로그인 */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.2 }}>
            <Button
              fullWidth variant='contained'
              onClick={() => handleSocialLogin('kakao')}
              sx={{ backgroundColor: '#FEE500', color: '#000', '&:hover': { backgroundColor: '#F0D800' }, py: 1.3 }}
            >
              카카오로 {tab === 0 ? '로그인' : '시작하기'}
            </Button>
            <Button
              fullWidth variant='contained'
              onClick={() => handleSocialLogin('naver')}
              sx={{ backgroundColor: '#03C75A', color: '#fff', '&:hover': { backgroundColor: '#02A84A' }, py: 1.3 }}
            >
              네이버로 {tab === 0 ? '로그인' : '시작하기'}
            </Button>
            <Button
              fullWidth variant='outlined'
              onClick={() => handleSocialLogin('google')}
              sx={{
                borderColor: '#B8C6DB', color: '#B8C6DB', py: 1.3,
                '&:hover': { borderColor: '#F7F7F7', color: '#F7F7F7', backgroundColor: 'rgba(184,198,219,0.1)' },
              }}
            >
              Google로 {tab === 0 ? '로그인' : '시작하기'}
            </Button>
          </Box>

          <Divider sx={{ width: '100%', borderColor: '#27496D' }}>
            <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.5, px: 1 }}>또는</Typography>
          </Divider>

          {/* 이메일 폼 */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField
              fullWidth size='small' placeholder='이메일'
              value={email} onChange={(e) => setEmail(e.target.value)}
              sx={inputSx}
            />
            <TextField
              fullWidth size='small' placeholder='비밀번호' type='password'
              value={password} onChange={(e) => setPassword(e.target.value)}
              sx={inputSx}
            />
            {tab === 1 && (
              <TextField
                fullWidth size='small' placeholder='비밀번호 확인' type='password'
                value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                sx={inputSx}
              />
            )}

            {error && (
              <Typography variant='caption' sx={{ color: '#E57373' }}>{error}</Typography>
            )}

            <Button
              fullWidth variant='contained'
              onClick={tab === 0 ? handleEmailLogin : handleRegister}
              sx={{
                backgroundColor: '#27496D', color: '#F7F7F7', py: 1.3,
                '&:hover': { backgroundColor: '#3A6080' },
              }}
            >
              {tab === 0 ? '로그인' : '회원가입'}
            </Button>
          </Box>

          <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.4, textAlign: 'center' }}>
            {tab === 0 ? '로그인' : '회원가입'} 시 서비스 이용약관 및 개인정보처리방침에 동의합니다
          </Typography>
        </Box>
      </Container>

      {/* 닉네임 설정 모달 (회원가입 완료 후) */}
      <NicknameModal isOpen={showNicknameModal} onConfirm={handleNicknameConfirm} />
    </Box>
  );
}

export default LoginPage;
