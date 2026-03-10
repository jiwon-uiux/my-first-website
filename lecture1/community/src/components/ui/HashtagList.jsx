import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

/**
 * HashtagList 컴포넌트
 * 해시태그 목록을 표시하는 컴포넌트
 *
 * Props:
 * @param {Array<string>} tags - 해시태그 문자열 배열 [Required]
 * @param {function} onTagClick - 태그 클릭 시 실행 함수 (tag: string) => void [Optional]
 *
 * Example usage:
 * <HashtagList tags={['파묘', '공포영화']} onTagClick={(tag) => console.log(tag)} />
 */
function HashtagList({ tags, onTagClick }) {
  if (!tags || tags.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={`#${tag}`}
          size='small'
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
          sx={{
            backgroundColor: 'rgba(184,198,219,0.15)',
            color: '#B8C6DB',
            fontSize: '0.75rem',
            cursor: onTagClick ? 'pointer' : 'default',
            '&:hover': {
              backgroundColor: onTagClick ? 'rgba(184,198,219,0.25)' : 'rgba(184,198,219,0.15)',
            },
          }}
        />
      ))}
    </Box>
  );
}

export default HashtagList;
