import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MOCK_POSTS } from '../../data/mockData';

/**
 * UserProfileDialog 컴포넌트
 * 닉네임 클릭 시 해당 유저의 게시물 목록과 친구 추가 버튼을 보여주는 다이얼로그
 *
 * Props:
 * @param {string} author - 조회할 닉네임 [Required]
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 함수 [Required]
 *
 * Example usage:
 * <UserProfileDialog author="달빛영화팬" isOpen={true} onClose={() => setOpen(false)} />
 */
function UserProfileDialog({ author, isOpen, onClose }) {
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(false);

  const userPosts = MOCK_POSTS.filter((p) => p.author === author);

  const handlePostClick = (postId) => {
    onClose();
    navigate(`/posts/${postId}`);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#142850',
          border: '1px solid #27496D',
          borderRadius: 3,
          minWidth: { xs: 300, sm: 420 },
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        {/* 유저 정보 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 44, height: 44, backgroundColor: '#27496D', fontSize: '1.2rem' }}>
              {author?.[0]}
            </Avatar>
            <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 700 }}>
              {author}
            </Typography>
          </Box>
          <Button
            size='small'
            variant={isFriend ? 'outlined' : 'contained'}
            startIcon={isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
            onClick={() => setIsFriend((prev) => !prev)}
            sx={isFriend
              ? { borderColor: '#27496D', color: '#B8C6DB', fontSize: '0.75rem', '&:hover': { borderColor: '#E57373', color: '#E57373' } }
              : { backgroundColor: '#27496D', color: '#F7F7F7', fontSize: '0.75rem', '&:hover': { backgroundColor: '#3A6080' } }
            }
          >
            {isFriend ? '친구 취소' : '친구 추가'}
          </Button>
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: '#27496D' }} />

      <DialogContent sx={{ pt: '12px !important' }}>
        <Typography variant='caption' sx={{ color: '#B8C6DB', opacity: 0.7, mb: 1.5, display: 'block' }}>
          작성한 게시물 {userPosts.length}개
        </Typography>

        {userPosts.length === 0 ? (
          <Typography variant='body2' sx={{ color: '#B8C6DB', opacity: 0.5, textAlign: 'center', py: 3 }}>
            작성한 게시물이 없어요 🌙
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {userPosts.map((post) => (
              <Box
                key={post.postId}
                onClick={() => handlePostClick(post.postId)}
                sx={{
                  backgroundColor: '#0C1E35',
                  border: '1px solid #27496D',
                  borderRadius: 2,
                  p: 1.5,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: '#B8C6DB' },
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.8, mb: 0.5, flexWrap: 'wrap' }}>
                  <Chip
                    label={post.contentType === 'movie' ? '영화' : '드라마'}
                    size='small'
                    sx={{ fontSize: '0.6rem', height: 18 }}
                  />
                  {post.isSpoiler && (
                    <Chip
                      label='스포'
                      size='small'
                      sx={{ fontSize: '0.6rem', height: 18, backgroundColor: '#8B0000', color: '#fff' }}
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
                      <StarIcon sx={{ color: '#FFD700', fontSize: 11 }} />
                      <Typography variant='caption' sx={{ color: '#B8C6DB' }}>{post.rating}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                    <FavoriteIcon sx={{ color: '#E57373', fontSize: 11 }} />
                    <Typography variant='caption' sx={{ color: '#B8C6DB' }}>{post.likes}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant='outlined'
          sx={{ borderColor: '#27496D', color: '#B8C6DB', '&:hover': { borderColor: '#B8C6DB' } }}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserProfileDialog;
