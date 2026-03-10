import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import CommentList from '../components/ui/CommentList';
import { MOCK_POSTS } from '../data/mockData';

/**
 * PostDetailPage 컴포넌트
 * URL의 postId로 해당 게시물 상세 표시
 * 작품 정보, 본문, 스포일러, 해시태그, 투표, 댓글 포함
 */
function PostDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [liked, setLiked] = useState(false);

  /** URL의 postId로 게시물 데이터 찾기 */
  const post = MOCK_POSTS.find((p) => p.postId === Number(postId));

  /** 게시물 없을 때 */
  if (!post) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#0C1E35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h3' sx={{ mb: 2 }}>🎬</Typography>
          <Typography variant='h6' sx={{ color: '#B8C6DB', mb: 3 }}>게시물을 찾을 수 없어요</Typography>
          <Button onClick={() => navigate('/posts')} sx={{ color: '#B8C6DB' }} startIcon={<ArrowBackIcon />}>
            목록으로
          </Button>
        </Box>
      </Box>
    );
  }

  const likeCount = post.likes + (liked ? 1 : 0);

  /** 해시태그 클릭 → 목록 페이지에서 해당 태그 검색 */
  const handleTagClick = (tag) => {
    navigate(`/posts?tag=${encodeURIComponent(tag)}`);
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

        {/* 작품 정보 카드 */}
        {post.work && (
          <WorkInfoCard
            title={post.work.title}
            contentType={post.work.contentType}
            genre={post.work.genre}
            avgRating={post.work.avgRating}
          />
        )}

        {/* 게시물 본문 카드 */}
        <Box sx={{ backgroundColor: '#142850', border: '1px solid #27496D', borderRadius: 3, p: 3, mb: 3 }}>
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
                {liked
                  ? <FavoriteIcon sx={{ color: '#E57373', fontSize: 20 }} />
                  : <FavoriteBorderIcon sx={{ color: '#B8C6DB', fontSize: 20 }} />
                }
              </IconButton>
              <Typography variant='caption' sx={{ color: '#B8C6DB' }}>{likeCount}</Typography>
            </Box>
          </Box>

          {/* 별점 + 한줄평 */}
          {post.rating && (
            <Box sx={{ mb: 2 }}>
              <RatingSection rating={post.rating} shortReview={post.shortReview} />
            </Box>
          )}

          <Divider sx={{ borderColor: '#27496D', mb: 2 }} />

          {/* 본문 */}
          <Typography variant='body1' sx={{ color: '#F7F7F7', lineHeight: 1.8, mb: 3 }}>
            {post.content}
          </Typography>

          {/* 스포일러 영역 */}
          {post.spoilerContent && (
            <Box sx={{ mb: 2 }}>
              <SpoilerToggle>
                <Typography variant='body2' sx={{ color: '#B8C6DB' }}>
                  {post.spoilerContent}
                </Typography>
              </SpoilerToggle>
            </Box>
          )}

          {/* 해시태그 — 클릭 시 해당 태그 검색 */}
          <HashtagList tags={post.hashtags} onTagClick={handleTagClick} />
        </Box>

        {/* 투표 */}
        {post.vote && (
          <VoteSection
            question={post.vote.question}
            options={post.vote.options}
            isMultiple={post.vote.isMultiple}
          />
        )}

        {/* 댓글 */}
        <CommentList comments={post.comments || []} />
      </Container>
    </Box>
  );
}

export default PostDetailPage;
