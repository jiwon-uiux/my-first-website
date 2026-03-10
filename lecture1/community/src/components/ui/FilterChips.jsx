import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

/**
 * FilterChips 컴포넌트
 * 게시물 목록의 콘텐츠 타입 & 장르 필터 칩 모음
 *
 * Props:
 * @param {string} selected - 현재 선택된 필터 값 [Required]
 * @param {function} onSelect - 필터 선택 시 실행 함수 (value: string) => void [Required]
 * @param {Array} options - 필터 옵션 배열 [Required] { value: string, label: string }
 *
 * Example usage:
 * <FilterChips selected="all" onSelect={setFilter} options={[{ value: 'all', label: '전체' }]} />
 */
function FilterChips({ selected, onSelect, options }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {options.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          onClick={() => onSelect(option.value)}
          sx={{
            backgroundColor: selected === option.value ? '#B8C6DB' : '#27496D',
            color: selected === option.value ? '#0C1E35' : '#B8C6DB',
            fontWeight: selected === option.value ? 700 : 400,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: selected === option.value ? '#B8C6DB' : '#3A6080',
            },
          }}
        />
      ))}
    </Box>
  );
}

export default FilterChips;
