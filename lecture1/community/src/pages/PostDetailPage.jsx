import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WorkInfoCard from '../components/ui/WorkInfoCard';
import RatingSection from '../components/ui/RatingSection';
import SpoilerToggle from '../components/ui/SpoilerToggle';
import HashtagList from '../components/ui/HashtagList';
import VoteSection from '../components/ui/VoteSection';

/** 임시 Mock 게시물 상세 데이터 */
const MOCK_POST = {
  postId: 1,
  title: '파묘 정말 무서웠어요 - 스포 없는 후기',
  author: '달빛영화팬',
  createdAt: '2024-03-10',
  rating: 4,
  shortReview: '한국 공포영화의 새로운 시대를 열었다',
  likes: 128,
  content:
    '파묘는 정말 오랜만에 제대로 된 한국 공포영화를 본 것 같았습니다. 장재현 감독 특유의 연출 방식과 배우들의 열연이 인상적이었어요. 특히 최민식 배우의 연기는 단연 압도적이었습니다. 공포 장르를 좋아하지 않는 분들도 한 번쯤은 도전해볼 만한 작품이에요.',
  hashtags: ['파묘', '공포영화', '최민식', '장재현'],
  work: { title: '파묘', contentType: 'movie', genre: '공포/미스터리', avgRating: 4.2 },
  vote: {
    question: '이 영화를 다시 보실 건가요?',
    isMultiple: false,
    options: [
      { optionId: 1, optionText: '꼭 다시 볼 거예요', count: 45 },
      { optionId: 2, optionText: '한 번으로 충분해요', count: 28 },
      { optionId: 3, optionText: '아직 안 봤어요', count: 17 },
    ],
  },
  spoilerContent: '결말에서 주인공이 결국 살아남지만, 그 과정에서 동료를 잃게 됩니다. 마지막 장면의 반전은 꽤 충격적이에요.',
};

/**
 * PostDetailPage 컴포넌트
 * 게시물 상세 페이지 - 작품 정보, 본문, 스포일러, 투표, 해시태그, 댓글 포함
 */
function PostDetailPage() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const post = MOCK_POST;
  const likeCount = post.likes + (liked ? 1 : 0);

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

        {/* 작품 정보 카드 */}
        <WorkInfoCard
          title={post.work.title}
          contentType={post.work.contentType}
          genre={post.work.genre}
          avgRating={post.work.avgRating}
        />

        {/* 게시물 본문 카드 */}
        <Box
          sx={{
            backgroundColor: '#142850',
            border: '1px solid #27496D',
            borderRadius: 3,
            p: 3,
            mb: 3,
          }}
        >
          {/* 제목 */}
          <Typography variant='h5' sx={{ color: '#F7F7F7', fontWeight: 700, mb: 1 }}>
            {post.title}
          </Typography>

          {/* 메타 + 좋아요 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.7 }}>
              {post.author} · {post.createdAt}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => setLiked(!liked)} size='small'>
                {liked ? (
                  <FavoriteIcon sx={{ color: '#E57373', fontSize: 20 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: '#B8C6DB', fontSize: 20 }} />
                )}
              </IconButton>
              <Typography variant='caption' sx={{ color: '#B8C6DB' }}>
                {likeCount}
              </Typography>
            </Box>
          </Box>

          {/* 별점 + 한줄평 */}
          <Box sx={{ mb: 2 }}>
            <RatingSection rating={post.rating} shortReview={post.shortReview} />
          </Box>

          <Divider sx={{ borderColor: '#27496D', mb: 2 }} />

          {/* 본문 */}
          <Typography variant='body1' sx={{ color: '#F7F7F7', lineHeight: 1.8, mb: 3 }}>
            {post.content}
          </Typography>

          {/* 스포일러 영역 */}
          <SpoilerToggle>
            <Typography variant='body2' sx={{ color: '#B8C6DB' }}>
              {post.spoilerContent}
            </Typography>
          </SpoilerToggle>

          {/* 해시태그 */}
          <HashtagList tags={post.hashtags} />
        </Box>

        {/* 투표 */}
        <VoteSection
          question={post.vote.question}
          options={post.vote.options}
          isMultiple={post.vote.isMultiple}
        />

        {/* 댓글 — Phase 5에서 CommentList 컴포넌트로 교체 예정 */}
        <Box
          sx={{
            backgroundColor: '#142850',
            border: '1px solid #27496D',
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 600 }}>
            댓글 (Phase 5에서 구현 예정)
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default PostDetailPage;
