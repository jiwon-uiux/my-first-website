import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PostCard from '../components/ui/PostCard';
import FilterChips from '../components/ui/FilterChips';

/** 콘텐츠 타입 필터 옵션 */
const CONTENT_TYPE_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'movie', label: '영화' },
  { value: 'drama', label: '드라마' },
];

/** 장르 필터 옵션 */
const GENRE_OPTIONS = [
  { value: 'all', label: '전체 장르' },
  { value: '공포', label: '공포' },
  { value: '로맨스', label: '로맨스' },
  { value: 'SF', label: 'SF' },
  { value: '액션', label: '액션' },
  { value: '드라마', label: '드라마' },
  { value: '코미디', label: '코미디' },
];

/** 임시 Mock 게시물 데이터 (Supabase 연동 전) */
const MOCK_POSTS = [
  { postId: 1, title: '파묘 정말 무서웠어요 - 스포 없는 후기', author: '달빛영화팬', rating: 4.5, likes: 128, contentType: 'movie', genre: '공포', isSpoiler: false },
  { postId: 2, title: '눈물의 여왕 16화 결말 이야기해요', author: '드라마중독자', rating: 5, likes: 342, contentType: 'drama', genre: '로맨스', isSpoiler: true },
  { postId: 3, title: '듄 파트2 IMAX로 봐야하는 이유', author: '시네마탐험가', rating: 4, likes: 87, contentType: 'movie', genre: 'SF', isSpoiler: false },
  { postId: 4, title: '선재 업고 튀어 OST 추천', author: '봄날의드라마', rating: 5, likes: 256, contentType: 'drama', genre: '로맨스', isSpoiler: false },
  { postId: 5, title: '범죄도시4 역대급 액션씬 모음', author: '마동석팬클럽', rating: 4, likes: 199, contentType: 'movie', genre: '액션', isSpoiler: false },
  { postId: 6, title: '이번 주 드라마 뭐 볼지 투표해요', author: '드라마고민러', rating: null, likes: 45, contentType: 'drama', genre: '드라마', isSpoiler: false },
];

/** 탭별 정렬 함수 */
const SORT_BY = {
  0: (a, b) => b.postId - a.postId,     // 최신
  1: (a, b) => b.likes - a.likes,       // 인기
  2: (a, b) => b.postId - a.postId,     // 투표 (임시 최신 정렬)
};

/**
 * PostListPage 컴포넌트
 * 게시물 목록 페이지 - 탭, 필터, 검색, 카드 목록 포함
 */
function PostListPage() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [contentType, setContentType] = useState('all');
  const [genre, setGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  /** 필터링 + 정렬된 게시물 목록 */
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchType = contentType === 'all' || post.contentType === contentType;
      const matchGenre = genre === 'all' || post.genre === genre;
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchGenre && matchSearch;
    }).sort(SORT_BY[tabValue]);
  }, [contentType, genre, searchQuery, tabValue]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#0C1E35' }}>
      <Container maxWidth='lg' sx={{ py: { xs: 2, md: 4 } }}>

        {/* 검색창 */}
        <TextField
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='작품명 또는 제목으로 검색'
          variant='outlined'
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#142850',
              color: '#F7F7F7',
              '& fieldset': { borderColor: '#27496D' },
              '&:hover fieldset': { borderColor: '#B8C6DB' },
              '&.Mui-focused fieldset': { borderColor: '#B8C6DB' },
            },
            '& .MuiInputBase-input::placeholder': { color: '#B8C6DB', opacity: 0.6 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: '#B8C6DB' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 콘텐츠 타입 필터 */}
        <FilterChips
          selected={contentType}
          onSelect={setContentType}
          options={CONTENT_TYPE_OPTIONS}
        />

        {/* 장르 필터 */}
        <Box sx={{ mt: 1, mb: 2 }}>
          <FilterChips selected={genre} onSelect={setGenre} options={GENRE_OPTIONS} />
        </Box>

        {/* 탭 */}
        <Tabs
          value={tabValue}
          onChange={(e, val) => setTabValue(val)}
          sx={{
            mb: 3,
            '& .MuiTab-root': { color: '#B8C6DB', textTransform: 'none', fontWeight: 500 },
            '& .Mui-selected': { color: '#F7F7F7', fontWeight: 700 },
            '& .MuiTabs-indicator': { backgroundColor: '#B8C6DB' },
          }}
        >
          <Tab label='최신' />
          <Tab label='인기' />
          <Tab label='투표' />
        </Tabs>

        {/* 게시물 카드 목록 */}
        {filteredPosts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredPosts.map((post) => (
              <Grid key={post.postId} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <PostCard {...post} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant='h4' sx={{ mb: 1 }}>🎬</Typography>
            <Typography sx={{ color: '#B8C6DB', opacity: 0.6 }}>
              해당하는 게시물이 없어요
            </Typography>
          </Box>
        )}
      </Container>

      {/* 모바일용 글쓰기 FAB */}
      <Fab
        onClick={() => navigate('/posts/write')}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#B8C6DB',
          color: '#0C1E35',
          display: { xs: 'flex', sm: 'none' },
          '&:hover': { backgroundColor: '#F7F7F7' },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default PostListPage;
