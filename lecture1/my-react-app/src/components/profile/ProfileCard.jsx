import Box from '@mui/material/Box';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * ProfileCard 컴포넌트
 * 글래스모피즘 스타일의 프로필 사진 카드 (좌측 배치)
 *
 * Props:
 * @param {string} imageSrc - 프로필 이미지 경로 [Optional, 기본값: '']
 * @param {string} imageAlt - 이미지 alt 텍스트 [Optional, 기본값: '프로필 사진']
 *
 * Example usage:
 * <ProfileCard imageSrc='/profile.jpg' imageAlt='홍길동 프로필' />
 */
function ProfileCard({ imageSrc = '', imageAlt = '프로필 사진' }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 2, md: 4 },
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: 200, md: 260 },
          height: { xs: 200, md: 260 },
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 8px 32px rgba(135, 206, 235, 0.3)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        {/* 프로필 사진 이미지 태그 - imageSrc에 이미지 경로를 입력해주세요 */}
        <img
          src={imageSrc || undefined}
          alt={imageAlt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: imageSrc ? 'block' : 'none',
          }}
        />

        {/* 이미지가 없을 때 플레이스홀더 */}
        {!imageSrc && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#4A6580',
              gap: 1,
            }}
          >
            <Box sx={{ fontSize: '3rem', lineHeight: 1 }}>👤</Box>
            <Box sx={{ fontSize: '0.72rem', letterSpacing: '0.08em', textAlign: 'center', px: 2 }}>
              프로필 사진을<br />추가해주세요
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProfileCard;
