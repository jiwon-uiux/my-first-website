import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileInfo from '../components/profile/ProfileInfo';

/**
 * ProfilePage
 * 2페이지: 글래스모피즘 프로필 카드 + 정보
 */
function ProfilePage() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #EEF7FC 0%, #D6EEF8 40%, #B0DCF0 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 6, md: 8 },
      }}
    >
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
          }}
        >
          <Grid container spacing={2} alignItems='center'>
            <Grid size={{ xs: 12, md: 5 }}>
              {/* 프로필 사진: imageSrc에 이미지 경로를 입력하세요 (예: '/profile.jpg') */}
              <ProfileCard
                imageSrc=''
                imageAlt='프로필 사진'
              />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <ProfileInfo
                name='이름을 입력해주세요'
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
