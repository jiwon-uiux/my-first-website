import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/**
 * SpoilerToggle 컴포넌트
 * 스포일러 내용을 블러 처리하고 토글 버튼으로 보이기/숨기기
 *
 * Props:
 * @param {node} children - 스포일러 처리할 콘텐츠 [Required]
 *
 * Example usage:
 * <SpoilerToggle><Typography>스포일러 내용...</Typography></SpoilerToggle>
 */
function SpoilerToggle({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px dashed #27496D',
        mb: 2,
      }}
    >
      {/* 스포일러 라벨 */}
      <Box sx={{ px: 2, pt: 1.5 }}>
        <Typography
          variant='caption'
          sx={{ color: '#E57373', fontWeight: 600, letterSpacing: '0.05em' }}
        >
          ⚠️ SPOILER
        </Typography>
      </Box>

      {/* 콘텐츠 + 블러 */}
      <Box
        sx={{
          p: 2,
          pt: 0.5,
          filter: isVisible ? 'none' : 'blur(6px)',
          transition: 'filter 0.3s',
          userSelect: isVisible ? 'auto' : 'none',
        }}
      >
        {children}
      </Box>

      {/* 블러 오버레이 버튼 */}
      {!isVisible && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(12,30,53,0.4)',
          }}
        >
          <Button
            size='small'
            startIcon={<VisibilityIcon />}
            onClick={() => setIsVisible(true)}
            sx={{
              color: '#F7F7F7',
              backgroundColor: 'rgba(20,40,80,0.9)',
              border: '1px solid #27496D',
              '&:hover': { backgroundColor: 'rgba(39,73,109,0.9)' },
            }}
          >
            스포일러 보기
          </Button>
        </Box>
      )}

      {/* 숨기기 버튼 */}
      {isVisible && (
        <Box sx={{ px: 2, pb: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size='small'
            startIcon={<VisibilityOffIcon />}
            onClick={() => setIsVisible(false)}
            sx={{ color: '#B8C6DB', fontSize: '0.75rem' }}
          >
            다시 숨기기
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default SpoilerToggle;
