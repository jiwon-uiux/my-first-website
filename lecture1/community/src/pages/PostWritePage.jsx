import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RatingSection from '../components/ui/RatingSection';

/** 작품 임시 목록 */
const WORK_LIST = [
  { workId: 1, title: '파묘', contentType: 'movie' },
  { workId: 2, title: '눈물의 여왕', contentType: 'drama' },
  { workId: 3, title: '듄: 파트2', contentType: 'movie' },
  { workId: 4, title: '선재 업고 튀어', contentType: 'drama' },
  { workId: 5, title: '범죄도시4', contentType: 'movie' },
];

const inputSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#0C1E35',
    color: '#F7F7F7',
    '& fieldset': { borderColor: '#27496D' },
    '&:hover fieldset': { borderColor: '#B8C6DB' },
    '&.Mui-focused fieldset': { borderColor: '#B8C6DB' },
  },
  '& .MuiInputBase-input::placeholder': { color: '#B8C6DB', opacity: 0.5 },
  '& .MuiInputLabel-root': { color: '#B8C6DB' },
  '& .MuiSelect-icon': { color: '#B8C6DB' },
};

/**
 * PostWritePage 컴포넌트
 * 게시물 작성 페이지
 * 작품 연결, 제목, 내용, 별점, 해시태그, 스포일러 여부 입력
 */
function PostWritePage() {
  const navigate = useNavigate();
  const [selectedWork, setSelectedWork] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [shortReview, setShortReview] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  /** 해시태그 추가 */
  const handleAddTag = () => {
    const cleaned = tagInput.replace(/^#/, '').trim();
    if (!cleaned || tags.includes(cleaned) || tags.length >= 5) return;
    setTags((prev) => [...prev, cleaned]);
    setTagInput('');
  };

  /** 해시태그 삭제 */
  const handleDeleteTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  /** 게시물 등록 */
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    console.log('게시물 등록:', { selectedWork, title, content, rating, shortReview, isSpoiler, tags });
    navigate('/posts');
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#0C1E35' }}>
      <Container maxWidth='md' sx={{ py: { xs: 2, md: 4 } }}>

        {/* 뒤로가기 */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/posts')}
          sx={{ color: '#B8C6DB', mb: 2, '&:hover': { color: '#F7F7F7' } }}
        >
          목록으로
        </Button>

        <Typography variant='h5' sx={{ color: '#F7F7F7', fontWeight: 700, mb: 3 }}>
          ✏️ 게시물 작성
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

          {/* 작품 선택 */}
          <Box sx={{ backgroundColor: '#142850', border: '1px solid #27496D', borderRadius: 3, p: 3 }}>
            <Typography variant='subtitle2' sx={{ color: '#B8C6DB', mb: 1.5 }}>작품 연결 (선택)</Typography>
            <Select
              value={selectedWork}
              onChange={(e) => setSelectedWork(e.target.value)}
              displayEmpty
              fullWidth
              size='small'
              sx={{
                ...inputSx['& .MuiOutlinedInput-root'],
                color: selectedWork ? '#F7F7F7' : '#B8C6DB',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#27496D' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#B8C6DB' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#B8C6DB' },
                backgroundColor: '#0C1E35',
              }}
            >
              <MenuItem value=''><em style={{ color: '#B8C6DB', opacity: 0.5 }}>작품을 선택해주세요</em></MenuItem>
              {WORK_LIST.map((w) => (
                <MenuItem key={w.workId} value={w.workId}>
                  {w.contentType === 'movie' ? '🎬' : '📺'} {w.title}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* 제목 + 내용 */}
          <Box sx={{ backgroundColor: '#142850', border: '1px solid #27496D', borderRadius: 3, p: 3 }}>
            <Typography variant='subtitle2' sx={{ color: '#B8C6DB', mb: 1.5 }}>게시물 내용</Typography>
            <TextField
              fullWidth
              placeholder='제목을 입력하세요'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ ...inputSx, mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder='내용을 입력하세요'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={inputSx}
            />
          </Box>

          {/* 별점 + 한줄평 */}
          <Box sx={{ backgroundColor: '#142850', border: '1px solid #27496D', borderRadius: 3, p: 3 }}>
            <Typography variant='subtitle2' sx={{ color: '#B8C6DB', mb: 1.5 }}>별점 (선택)</Typography>
            <RatingSection rating={rating} isEditable onRatingChange={setRating} />
            {rating > 0 && (
              <TextField
                fullWidth
                size='small'
                placeholder='한줄평을 입력하세요 (선택)'
                value={shortReview}
                onChange={(e) => setShortReview(e.target.value)}
                sx={{ ...inputSx, mt: 1.5 }}
              />
            )}
          </Box>

          {/* 해시태그 */}
          <Box sx={{ backgroundColor: '#142850', border: '1px solid #27496D', borderRadius: 3, p: 3 }}>
            <Typography variant='subtitle2' sx={{ color: '#B8C6DB', mb: 1.5 }}>해시태그 (최대 5개)</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
              <TextField
                size='small'
                placeholder='#태그 입력 후 추가'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                sx={{ ...inputSx, flex: 1 }}
              />
              <Button
                variant='outlined'
                onClick={handleAddTag}
                startIcon={<AddIcon />}
                sx={{ borderColor: '#27496D', color: '#B8C6DB', whiteSpace: 'nowrap', '&:hover': { borderColor: '#B8C6DB' } }}
              >
                추가
              </Button>
            </Box>
            {tags.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    onDelete={() => handleDeleteTag(tag)}
                    size='small'
                    sx={{ backgroundColor: 'rgba(184,198,219,0.15)', color: '#B8C6DB', '& .MuiChip-deleteIcon': { color: '#B8C6DB' } }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* 스포일러 여부 */}
          <Box sx={{ backgroundColor: '#142850', border: '1px solid #27496D', borderRadius: 3, p: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isSpoiler}
                  onChange={(e) => setIsSpoiler(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#E57373' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#8B0000' },
                  }}
                />
              }
              label={
                <Typography variant='body2' sx={{ color: '#B8C6DB' }}>
                  {isSpoiler ? '⚠️ 스포일러 포함' : '스포일러 없음'}
                </Typography>
              }
            />
          </Box>

          <Divider sx={{ borderColor: '#27496D' }} />

          {/* 등록 버튼 */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant='outlined'
              onClick={() => navigate('/posts')}
              sx={{ borderColor: '#27496D', color: '#B8C6DB', '&:hover': { borderColor: '#B8C6DB' } }}
            >
              취소
            </Button>
            <Button
              variant='contained'
              onClick={handleSubmit}
              sx={{ backgroundColor: '#B8C6DB', color: '#0C1E35', fontWeight: 700, px: 4, '&:hover': { backgroundColor: '#F7F7F7' } }}
            >
              게시하기
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PostWritePage;
