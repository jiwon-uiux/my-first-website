import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import useScrollReveal from '../../hooks/useScrollReveal';

/** 기술 스택 목록 */
const SKILLS = ['HTML5', 'CSS3', 'JavaScript', 'React', 'MUI', 'Vite', 'Git'];

/** 수상 내역 목록 */
const AWARDS = [
  { year: '2024', title: '수상 내역을 입력해주세요' },
];

/** 경력 목록 */
const CAREERS = [
  { period: '2024.01 ~ 현재', title: '경력을 입력해주세요' },
];

/**
 * ProfileInfo 컴포넌트
 * 이름, 소개, 수상, 경력, 기술스택 정보 (우측 배치)
 *
 * Props:
 * @param {string} name - 이름 [Optional, 기본값: '이름을 입력해주세요']
 * @param {string} intro - 한 줄 소개 [Optional, 기본값: '성장하는 웹퍼블리셔']
 *
 * Example usage:
 * <ProfileInfo name='홍길동' intro='성장하는 웹퍼블리셔' />
 */
function ProfileInfo({ name = '이름을 입력해주세요', intro = '성장하는 웹퍼블리셔' }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <Box
      ref={ref}
      sx={{
        p: { xs: 2, md: 4 },
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
      }}
    >
      {/* 이름 */}
      <Typography
        component='h2'
        sx={{
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          fontWeight: 700,
          letterSpacing: '0.05em',
          color: '#1A2B4A',
          mb: 1,
        }}
      >
        { name }
      </Typography>

      {/* 한 줄 소개 */}
      <Typography
        sx={{
          fontSize: { xs: '0.95rem', md: '1.05rem' },
          fontWeight: 300,
          color: '#4A6580',
          letterSpacing: '0.05em',
          mb: 3,
        }}
      >
        { intro }
      </Typography>

      {/* 구분선 */}
      <Box sx={{ width: 40, height: 2, backgroundColor: '#87CEEB', mb: 3 }} />

      {/* 수상 */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', color: '#87CEEB', mb: 1.5, textTransform: 'uppercase' }}>
          Awards
        </Typography>
        { AWARDS.map((award, idx) => (
          <Box key={idx} sx={{ display: 'flex', gap: 2, mb: 0.8 }}>
            <Typography sx={{ fontSize: '0.8rem', color: '#87CEEB', fontWeight: 500, minWidth: 36 }}>
              { award.year }
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: '#4A6580' }}>
              { award.title }
            </Typography>
          </Box>
        )) }
      </Box>

      {/* 경력 */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', color: '#87CEEB', mb: 1.5, textTransform: 'uppercase' }}>
          Career
        </Typography>
        { CAREERS.map((career, idx) => (
          <Box key={idx} sx={{ mb: 0.8 }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#87CEEB', fontWeight: 400, mb: 0.2 }}>
              { career.period }
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: '#4A6580' }}>
              { career.title }
            </Typography>
          </Box>
        )) }
      </Box>

      {/* 기술 스택 */}
      <Box>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', color: '#87CEEB', mb: 1.5, textTransform: 'uppercase' }}>
          Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          { SKILLS.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size='small'
              sx={{
                backgroundColor: 'rgba(135, 206, 235, 0.15)',
                color: '#1A2B4A',
                border: '1px solid rgba(135, 206, 235, 0.4)',
                fontSize: '0.78rem',
                letterSpacing: '0.05em',
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: 'rgba(135, 206, 235, 0.35)',
                  borderColor: '#87CEEB',
                  transform: 'translateY(-2px)',
                },
              }}
            />
          )) }
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileInfo;
