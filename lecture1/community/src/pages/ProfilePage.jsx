import { useState, useRef } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { MOCK_POSTS } from '../data/mockData';

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
  const [user, setUser] = useState({
    nickname: '달빛영화팬',
    bio: '영화와 드라마를 사랑하는 밤의 관람자 🌙',
    profileImageUrl: null,
    joinDate: '2024-01-15',
    postCount: 12,
    friendCount: 34,
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editNickname, setEditNickname] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editImageUrl, setEditImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  /** 편집 다이얼로그 열기 */
  const handleEditOpen = () => {
    setEditNickname(user.nickname);
    setEditBio(user.bio);
    setEditImageUrl(user.profileImageUrl);
    setIsEditOpen(true);
  };

  /** 편집 저장 */
  const handleEditSave = () => {
    if (!editNickname.trim() || editNickname.trim().length < 2) return;
    setUser((prev) => ({
      ...prev,
      nickname: editNickname.trim(),
      bio: editBio.trim(),
      profileImageUrl: editImageUrl,
    }));
    setIsEditOpen(false);
  };

  /** 프로필 이미지 변경 */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditImageUrl(URL.createObjectURL(file));
  };

  /** 내가 쓴 게시물 (Mock: 달빛영화팬 작성 글) */
  const myPosts = MOCK_POSTS.filter((p) => p.author === user.nickname);

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
            src={user.profileImageUrl || undefined}
            sx={{
              width: 80, height: 80,
              backgroundColor: '#27496D',
              fontSize: '2rem',
              flexShrink: 0,
            }}
          >
            {!user.profileImageUrl && user.nickname[0]}
          </Avatar>

          {/* 사용자 정보 */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 700 }}>
                {user.nickname}
              </Typography>
              <Button
                size='small'
                startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                onClick={handleEditOpen}
                sx={{ color: '#B8C6DB', fontSize: '0.75rem', p: '2px 8px', minWidth: 0 }}
              >
                편집
              </Button>
            </Box>

            <Typography variant='body2' sx={{ color: '#B8C6DB', opacity: 0.8, mb: 1.5 }}>
              {user.bio}
            </Typography>

            {/* 통계 */}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 700, lineHeight: 1 }}>
                  {myPosts.length}
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
                  {user.friendCount}
                </Typography>
                <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.6 }}>친구</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 프로필 편집 다이얼로그 */}
        <Dialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: '#142850',
              border: '1px solid #27496D',
              borderRadius: 3,
              minWidth: { xs: 300, sm: 420 },
            },
          }}
        >
          <DialogTitle sx={{ color: '#F7F7F7', fontWeight: 700, pb: 1 }}>
            프로필 편집
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '12px !important' }}>

            {/* 프로필 이미지 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={editImageUrl || undefined}
                sx={{ width: 64, height: 64, backgroundColor: '#27496D', fontSize: '1.5rem' }}
              >
                {!editImageUrl && editNickname[0]}
              </Avatar>
              <Button
                component='label'
                variant='outlined'
                startIcon={<AddPhotoAlternateIcon />}
                sx={{
                  borderColor: '#27496D', color: '#B8C6DB', borderStyle: 'dashed',
                  '&:hover': { borderColor: '#B8C6DB', backgroundColor: 'rgba(184,198,219,0.05)' },
                }}
              >
                이미지 변경
                <input ref={fileInputRef} type='file' hidden accept='image/*' onChange={handleImageChange} />
              </Button>
            </Box>

            {/* 닉네임 */}
            <TextField
              fullWidth
              label='닉네임'
              value={editNickname}
              onChange={(e) => setEditNickname(e.target.value)}
              inputProps={{ maxLength: 12 }}
              helperText={`${editNickname.length}/12`}
              sx={inputSx}
              FormHelperTextProps={{ sx: { color: '#B8C6DB', opacity: 0.6 } }}
            />

            {/* 소개글 */}
            <TextField
              fullWidth
              label='소개글'
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              multiline
              rows={2}
              inputProps={{ maxLength: 60 }}
              helperText={`${editBio.length}/60`}
              sx={inputSx}
              FormHelperTextProps={{ sx: { color: '#B8C6DB', opacity: 0.6 } }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
            <Button
              onClick={() => setIsEditOpen(false)}
              sx={{ color: '#B8C6DB', borderColor: '#27496D', '&:hover': { borderColor: '#B8C6DB' } }}
              variant='outlined'
            >
              취소
            </Button>
            <Button
              onClick={handleEditSave}
              disabled={!editNickname.trim() || editNickname.trim().length < 2}
              variant='contained'
              sx={{
                backgroundColor: '#B8C6DB', color: '#0C1E35', fontWeight: 700,
                '&:hover': { backgroundColor: '#F7F7F7' },
                '&:disabled': { backgroundColor: '#27496D', color: '#B8C6DB' },
              }}
            >
              저장
            </Button>
          </DialogActions>
        </Dialog>

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
