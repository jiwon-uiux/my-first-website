import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

/**
 * RatingSection 컴포넌트
 * 별점(1~5) + 한줄평 표시 및 입력 컴포넌트
 *
 * Props:
 * @param {number} rating - 현재 별점 값 (1~5) [Optional, 기본값: 0]
 * @param {string} shortReview - 한줄평 텍스트 [Optional, 기본값: '']
 * @param {boolean} isEditable - 편집 가능 여부 [Optional, 기본값: false]
 * @param {function} onRatingChange - 별점 변경 시 실행 함수 (value: number) => void [Optional]
 *
 * Example usage:
 * <RatingSection rating={4} shortReview="정말 인상적인 영화" isEditable={false} />
 */
function RatingSection({ rating = 0, shortReview = '', isEditable = false, onRatingChange }) {
  const [hovered, setHovered] = useState(0);

  const displayRating = hovered || rating;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      {/* 별점 */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((star) =>
          isEditable ? (
            <Box
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onRatingChange?.(star)}
              sx={{ cursor: 'pointer' }}
            >
              {star <= displayRating ? (
                <StarIcon sx={{ color: '#FFD700', fontSize: 24 }} />
              ) : (
                <StarBorderIcon sx={{ color: '#27496D', fontSize: 24 }} />
              )}
            </Box>
          ) : (
            <StarIcon
              key={star}
              sx={{ color: star <= rating ? '#FFD700' : '#27496D', fontSize: 20 }}
            />
          )
        )}
      </Box>

      {/* 별점 수치 */}
      {rating > 0 && (
        <Typography variant='body2' sx={{ color: '#B8C6DB', fontWeight: 600 }}>
          {rating}.0
        </Typography>
      )}

      {/* 한줄평 */}
      {shortReview && (
        <Typography variant='body2' sx={{ color: '#B8C6DB', opacity: 0.8 }}>
          · {shortReview}
        </Typography>
      )}
    </Box>
  );
}

export default RatingSection;
