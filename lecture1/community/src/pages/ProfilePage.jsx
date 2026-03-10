import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { MOCK_POSTS } from '../data/mockData';

/** 임시 사용자 데이터 */
const MOCK_USER = {
  nickname: '달빛영화팬',
  bio: '영화와 드라마를 사랑하는 밤의 관람자 🌙',
  profileImageUrl: null,
  joinDate: '2024-01-15',
  postCount: 12,
  friendCount: 34,
};

/** 임시 별점 내역 */
const MOCK_RATINGS = [
  { workId: 1, title: '파묘', contentType: 'movie', rating: 4, shortReview: '한국 공포영화의 새 시대' },
  { workId: 2, title: '눈물의 여왕', contentType: 'drama', rating: 5, shortReview: '인생 드라마' },
  { workId: 3, title: '듄: 파트2', contentType: 'movie', rating: 4, shortReview: 'IMAX로 봐야 제맛' },
];

/**
 * ProfilePage 컴포넌트
 * 마이페이지 — 사용자 정보, 내가 쓴 게시물, 별점 내역 탭
 */
function ProfilePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  /** 내가 쓴 게시물 (Mock: 달빛영화팬 작성 글) */
  const myPosts = MOCK_POSTS.filter((p) => p.author === MOCK_USER.nickname);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#0C1E35' }}>
      <Container maxWidth='md' sx={{ py: { xs: 2, md: 4 } }}>

        {/* 프로필 카드 */}
        <Box
          sx={{
            backgroundColor: '#142850',
            border: '1px solid #27496D',
            borderRadius: 3,
            p: 3,
            mb: 3,
            display: 'flex',
            gap: 3,
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          {/* 아바타 */}
          <Avatar
            src={MOCK_USER.profileImageUrl || undefined}
            sx={{
              width: 80, height: 80,
              backgroundColor: '#27496D',
              fontSize: '2rem',
              flexShrink: 0,
            }}
          >
            {!MOCK_USER.profileImageUrl && MOCK_USER.nickname[0]}
          </Avatar>

          {/* 사용자 정보 */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 700 }}>
                {MOCK_USER.nickname}
              </Typography>
              <Button
                size='small'
                startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                sx={{ color: '#B8C6DB', fontSize: '0.75rem', p: '2px 8px', minWidth: 0 }}
              >
                편집
              </Button>
            </Box>

            <Typography variant='body2' sx={{ color: '#B8C6DB', opacity: 0.8, mb: 1.5 }}>
              {MOCK_USER.bio}
            </Typography>

            {/* 통계 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 700, lineHeight: 1 }}>
                  {MOCK_USER.postCount}
                </Typography>
                <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.6 }}>게시물</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 700, lineHeight: 1 }}>
                  {MOCK_RATINGS.length}
                </Typography>
                <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.6 }}>별점</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 700, lineHeight: 1 }}>
                  {MOCK_USER.friendCount}
                </Typography>
                <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.6 }}>친구</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 탭: 내가 쓴 글 / 별점 내역 */}
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{
            mb: 2,
            '& .MuiTab-root': { color: '#B8C6DB', textTransform: 'none', fontWeight: 500 },
            '& .Mui-selected': { color: '#F7F7F7', fontWeight: 700 },
            '& .MuiTabs-indicator': { backgroundColor: '#B8C6DB' },
          }}
        >
          <Tab label='내가 쓴 글' />
          <Tab label='별점 내역' />
        </Tabs>

        <Divider sx={{ borderColor: '#27496D', mb: 2 }} />

        {/* 내가 쓴 글 탭 */}
        {tab === 0 && (
          myPosts.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {myPosts.map((post) => (
                <Box
                  key={post.postId}
                  onClick={() => navigate(`/posts/${post.postId}`)}
                  sx={{
                    backgroundColor: '#142850',
                    border: '1px solid #27496D',
                    borderRadius: 2,
                    p: 2,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: '#B8C6DB' },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <Chip
                      label={post.contentType === 'movie' ? '영화' : '드라마'}
                      size='small'
                      sx={{ fontSize: '0.65rem', height: 20 }}
                    />
                    {post.isSpoiler && (
                      <Chip
                        label='스포'
                        size='small'
                        sx={{ fontSize: '0.65rem', height: 20, backgroundColor: '#8B0000', color: '#fff' }}
                      />
                    )}
                  </Box>
                  <Typography variant='body2' sx={{ color: '#F7F7F7', fontWeight: 600, mb: 0.5 }}>
                    {post.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.6 }}>
                      {post.createdAt}
                    </Typography>
                    {post.rating && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <StarIcon sx={{ color: '#FFD700', fontSize: 12 }} />
                        <Typography variant='caption' sx={{ color: '#B8C6DB' }}>{post.rating}</Typography>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                      <FavoriteIcon sx={{ color: '#E57373', fontSize: 12 }} />
                      <Typography variant='caption' sx={{ color: '#B8C6DB' }}>{post.likes}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant='h4' sx={{ mb: 1 }}>🎬</Typography>
              <Typography sx={{ color: '#B8C6DB', opacity: 0.6 }}>아직 작성한 게시물이 없어요</Typography>
              <Button
                variant='outlined'
                onClick={() => navigate('/posts/write')}
                sx={{ mt: 2, borderColor: '#27496D', color: '#B8C6DB', '&:hover': { borderColor: '#B8C6DB' } }}
              >
                첫 게시물 작성하기
              </Button>
            </Box>
          )
        )}

        {/* 별점 내역 탭 */}
        {tab === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {MOCK_RATINGS.map((item) => (
              <Box
                key={item.workId}
                sx={{
                  backgroundColor: '#142850',
                  border: '1px solid #27496D',
                  borderRadius: 2,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography sx={{ fontSize: '1.5rem' }}>
                  {item.contentType === 'movie' ? '🎬' : '📺'}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant='body2' sx={{ color: '#F7F7F7', fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.7 }}>
                    {item.shortReview}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} sx={{ color: s <= item.rating ? '#FFD700' : '#27496D', fontSize: 16 }} />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ProfilePage;
