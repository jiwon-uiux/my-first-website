import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * VoteSection 컴포넌트
 * 게시물 상세에서 투표 UI (2~4개 선택지, 결과 표시)
 *
 * Props:
 * @param {string} question - 투표 질문 텍스트 [Required]
 * @param {Array} options - 선택지 배열 [Required] { optionId: number, optionText: string, count: number }
 * @param {boolean} isMultiple - 복수 선택 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <VoteSection question="다시 보실 건가요?" options={[{ optionId: 1, optionText: '예', count: 10 }]} />
 */
function VoteSection({ question, options, isMultiple = false }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalVotes = options.reduce((sum, opt) => sum + (opt.count || 0), 0) + (isSubmitted ? 1 : 0);

  const handleSelect = (optionId) => {
    if (isSubmitted) return;
    if (isMultiple) {
      setSelectedIds((prev) =>
        prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
      );
    } else {
      setSelectedIds([optionId]);
    }
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0) return;
    setIsSubmitted(true);
  };

  const getPercent = (count) => {
    if (totalVotes === 0) return 0;
    return Math.round((count / totalVotes) * 100);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#142850',
        border: '1px solid #27496D',
        borderRadius: 3,
        p: 3,
        mb: 3,
      }}
    >
      <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 600, mb: 2 }}>
        📊 {question}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.optionId);
          const percent = isSubmitted ? getPercent(option.count + (isSelected ? 1 : 0)) : 0;

          return (
            <Box key={option.optionId}>
              <Button
                fullWidth
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => handleSelect(option.optionId)}
                disabled={isSubmitted}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderColor: '#27496D',
                  color: isSelected ? '#0C1E35' : '#B8C6DB',
                  backgroundColor: isSelected ? '#B8C6DB' : 'transparent',
                  '&:hover': {
                    backgroundColor: isSelected ? '#B8C6DB' : 'rgba(184,198,219,0.1)',
                    borderColor: '#B8C6DB',
                  },
                  '&:disabled': {
                    color: isSelected ? '#0C1E35' : '#B8C6DB',
                    backgroundColor: isSelected ? '#B8C6DB' : 'transparent',
                    borderColor: '#27496D',
                  },
                }}
              >
                {option.optionText}
                {isSubmitted && (
                  <Typography
                    component='span'
                    sx={{ ml: 'auto', fontSize: '0.8rem', fontWeight: 700 }}
                  >
                    {percent}%
                  </Typography>
                )}
              </Button>

              {isSubmitted && (
                <LinearProgress
                  variant='determinate'
                  value={percent}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#27496D',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: isSelected ? '#B8C6DB' : '#4A7A9B',
                    },
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {!isSubmitted && (
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={selectedIds.length === 0}
          sx={{
            mt: 2,
            backgroundColor: '#27496D',
            color: '#B8C6DB',
            '&:hover': { backgroundColor: '#3A6080' },
            '&:disabled': { backgroundColor: '#1a2f48', color: '#4A6A8A' },
          }}
        >
          투표하기
        </Button>
      )}

      {isSubmitted && (
        <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.6, display: 'block', mt: 1.5 }}>
          총 {totalVotes}명 참여
        </Typography>
      )}
    </Box>
  );
}

export default VoteSection;
