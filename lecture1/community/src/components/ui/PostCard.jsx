import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';

/**
 * PostCard 컴포넌트
 * 게시물 목록에서 사용하는 카드 UI
 *
 * Props:
 * @param {number} postId - 게시물 고유 번호 [Required]
 * @param {string} title - 게시물 제목 [Required]
 * @param {string} author - 작성자 닉네임 [Required]
 * @param {number} rating - 별점 (1~5) [Optional, 기본값: null]
 * @param {number} likes - 좋아요 수 [Optional, 기본값: 0]
 * @param {string} contentType - 작품 구분 ('movie' | 'drama') [Optional, 기본값: null]
 * @param {string} genre - 장르명 [Optional, 기본값: null]
 * @param {boolean} isSpoiler - 스포일러 여부 [Optional, 기본값: false]
 * @param {string} posterUrl - 포스터 이미지 URL [Optional, 기본값: null]
 *
 * Example usage:
 * <PostCard postId={1} title="파묘 후기" author="달빛영화팬" rating={4.5} likes={128} contentType="movie" />
 */
function PostCard({
  postId,
  title,
  author,
  rating = null,
  likes = 0,
  contentType = null,
  genre = null,
  isSpoiler = false,
  posterUrl = null,
}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/posts/${postId}`)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        },
      }}
    >
      {/* 포스터 영역 */}
      <Box
        sx={{
          height: 160,
          backgroundColor: '#27496D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px 12px 0 0',
          overflow: 'hidden',
          backgroundImage: posterUrl ? `url(${posterUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!posterUrl && (
          <Typography sx={{ fontSize: '2.5rem' }}>
            {contentType === 'movie' ? '🎬' : contentType === 'drama' ? '📺' : '🎞️'}
          </Typography>
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        {/* 장르 & 타입 칩 */}
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
          {contentType && (
            <Chip
              label={contentType === 'movie' ? '영화' : '드라마'}
              size='small'
              sx={{ fontSize: '0.65rem', height: 20 }}
            />
          )}
          {genre && (
            <Chip
              label={genre}
              size='small'
              sx={{ fontSize: '0.65rem', height: 20, backgroundColor: '#0C1E35' }}
            />
          )}
          {isSpoiler && (
            <Chip
              label='스포'
              size='small'
              sx={{ fontSize: '0.65rem', height: 20, backgroundColor: '#8B0000', color: '#fff' }}
            />
          )}
        </Box>

        {/* 제목 */}
        <Typography
          variant='body2'
          sx={{
            color: '#F7F7F7',
            fontWeight: 600,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>

        {/* 작성자 */}
        <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.6, display: 'block', mb: 1 }}>
          {author}
        </Typography>

        {/* 별점 & 좋아요 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {rating !== null ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ color: '#FFD700', fontSize: 16 }} />
              <Typography variant='caption' sx={{ color: '#B8C6DB' }}>
                {rating}
              </Typography>
            </Box>
          ) : (
            <Box />
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FavoriteIcon sx={{ color: '#E57373', fontSize: 16 }} />
            <Typography variant='caption' sx={{ color: '#B8C6DB' }}>
              {likes}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCard;
