import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

/**
 * PostCard 컴포넌트
 * 게시물 목록에서 사용하는 카드 UI
 * isSpoiler=true 시 제목 블러 + "스포일러 보기" 버튼 표시
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
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);

  const handleCardClick = () => {
    navigate(`/posts/${postId}`);
  };

  const handleRevealSpoiler = (e) => {
    e.stopPropagation();
    setSpoilerRevealed(true);
  };

  return (
    <Card
      onClick={handleCardClick}
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

        {/* 제목 — 스포일러 시 블러 처리 */}
        <Box sx={{ position: 'relative', mb: 1 }}>
          <Typography
            variant='body2'
            sx={{
              color: '#F7F7F7',
              fontWeight: 600,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4,
              filter: isSpoiler && !spoilerRevealed ? 'blur(5px)' : 'none',
              userSelect: isSpoiler && !spoilerRevealed ? 'none' : 'auto',
              transition: 'filter 0.3s',
            }}
          >
            {title}
          </Typography>

          {/* 스포일러 보기 버튼 오버레이 */}
          {isSpoiler && !spoilerRevealed && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                size='small'
                startIcon={<VisibilityIcon sx={{ fontSize: 12 }} />}
                onClick={handleRevealSpoiler}
                sx={{
                  color: '#F7F7F7',
                  backgroundColor: 'rgba(12,30,53,0.85)',
                  border: '1px solid #27496D',
                  fontSize: '0.65rem',
                  py: 0.3,
                  px: 1,
                  '&:hover': { backgroundColor: 'rgba(39,73,109,0.9)' },
                }}
              >
                스포일러 보기
              </Button>
            </Box>
          )}
        </Box>

        {/* 작성자 */}
        <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.6, display: 'block', mb: 1 }}>
          {author}
        </Typography>

        {/* 별점 & 좋아요 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {rating !== null ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ color: '#FFD700', fontSize: 16 }} />
              <Typography variant='caption' sx={{ color: '#B8C6DB' }}>{rating}</Typography>
            </Box>
          ) : (
            <Box />
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FavoriteIcon sx={{ color: '#E57373', fontSize: 16 }} />
            <Typography variant='caption' sx={{ color: '#B8C6DB' }}>{likes}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCard;
