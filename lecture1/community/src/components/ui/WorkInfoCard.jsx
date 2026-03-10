import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

/**
 * WorkInfoCard 컴포넌트
 * 게시물 상세에서 연결된 작품 정보를 표시하는 카드
 *
 * Props:
 * @param {string} title - 작품명 [Required]
 * @param {string} contentType - 작품 구분 ('movie' | 'drama') [Required]
 * @param {string} genre - 장르명 [Optional, 기본값: null]
 * @param {string} posterUrl - 포스터 이미지 URL [Optional, 기본값: null]
 * @param {number} avgRating - 평균 별점 [Optional, 기본값: null]
 *
 * Example usage:
 * <WorkInfoCard title="파묘" contentType="movie" genre="공포" avgRating={4.2} />
 */
function WorkInfoCard({ title, contentType, genre = null, posterUrl = null, avgRating = null }) {
  return (
    <Box
      sx={{
        backgroundColor: '#142850',
        border: '1px solid #27496D',
        borderRadius: 3,
        p: 3,
        mb: 3,
        display: 'flex',
        gap: 3,
        alignItems: 'flex-start',
      }}
    >
      {/* 포스터 */}
      <Box
        sx={{
          width: 80,
          height: 120,
          backgroundColor: '#27496D',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          backgroundImage: posterUrl ? `url(${posterUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!posterUrl && (
          <Typography sx={{ fontSize: '2rem' }}>
            {contentType === 'movie' ? '🎬' : '📺'}
          </Typography>
        )}
      </Box>

      {/* 작품 정보 */}
      <Box>
        <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 700, mb: 0.5 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Chip
            label={contentType === 'movie' ? '영화' : '드라마'}
            size='small'
            sx={{ fontSize: '0.7rem', height: 22 }}
          />
          {genre && (
            <Chip
              label={genre}
              size='small'
              sx={{ fontSize: '0.7rem', height: 22, backgroundColor: '#0C1E35' }}
            />
          )}
        </Box>
        {avgRating !== null && (
          <Typography variant='body2' sx={{ color: '#B8C6DB' }}>
            ⭐ 평균 {avgRating}점
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default WorkInfoCard;
