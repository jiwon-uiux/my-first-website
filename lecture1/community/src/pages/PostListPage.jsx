import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

import { MOCK_POSTS } from '../data/mockData';

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
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);
  const [contentType, setContentType] = useState('all');
  const [genre, setGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  /** URL ?tag= 쿼리 파라미터로 해시태그 검색 자동 적용 */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tag = params.get('tag');
    if (tag) setSearchQuery(`#${tag}`);
  }, [location.search]);

  /** 필터링 + 정렬된 게시물 목록 */
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchType = contentType === 'all' || post.contentType === contentType;
      const matchGenre = genre === 'all' || post.genre === genre;
      const isHashtagSearch = searchQuery.startsWith('#');
      const keyword = isHashtagSearch ? searchQuery.slice(1).toLowerCase() : searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        (isHashtagSearch
          ? post.hashtags?.some((t) => t.toLowerCase().includes(keyword))
          : post.title.toLowerCase().includes(keyword) || post.author.toLowerCase().includes(keyword));
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
          placeholder='제목, 작품명 또는 #해시태그로 검색'
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

      {/* 글쓰기 FAB (항상 표시) */}
      <Fab
        onClick={() => navigate('/posts/write')}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#B8C6DB',
          color: '#0C1E35',
          width: 60,
          height: 60,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          '&:hover': { backgroundColor: '#F7F7F7', transform: 'scale(1.05)' },
          transition: 'transform 0.2s',
        }}
      >
        <AddIcon sx={{ fontSize: 28 }} />
      </Fab>
    </Box>
  );
}

export default PostListPage;
