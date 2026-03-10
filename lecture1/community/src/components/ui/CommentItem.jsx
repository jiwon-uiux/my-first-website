import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import VisibilityIcon from '@mui/icons-material/Visibility';

/** 이모지 반응 옵션 */
const EMOJI_OPTIONS = ['😂', '😍', '😱', '🔥', '👍', '😭'];

/**
 * CommentItem 컴포넌트
 * 댓글/대댓글 단위 컴포넌트 (좋아요, 이모지 반응, 대댓글 입력, 스포일러 토글)
 *
 * Props:
 * @param {object} comment - 댓글 데이터 [Required]
 * @param {boolean} isReply - 대댓글 여부 [Optional, 기본값: false]
 * @param {function} onReply - 대댓글 작성 시 실행 함수 (parentId, content) => void [Optional]
 *
 * Example usage:
 * <CommentItem comment={commentData} onReply={handleReply} />
 */
function CommentItem({ comment, isReply = false, onReply }) {
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [spoilerVisible, setSpoilerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const likeCount = (comment.likes || 0) + (liked ? 1 : 0);

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onReply?.(comment.commentId, replyText.trim());
    setReplyText('');
    setShowReplyInput(false);
  };

  return (
    <Box
      sx={{
        ml: isReply ? 4 : 0,
        p: 2,
        backgroundColor: isReply ? 'rgba(12,30,53,0.6)' : '#0C1E35',
        borderRadius: 2,
        border: '1px solid #27496D',
        borderLeft: isReply ? '3px solid #B8C6DB' : '1px solid #27496D',
      }}
    >
      {/* 작성자 + 날짜 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Typography variant='caption' sx={{ color: '#B8C6DB', fontWeight: 600 }}>
          {comment.emoji && <span style={{ marginRight: 4 }}>{comment.emoji}</span>}
          {comment.author}
        </Typography>
      </Box>

      {/* 댓글 내용 (스포일러 처리) */}
      {comment.isSpoiler && !spoilerVisible ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant='body2' sx={{ color: '#B8C6DB', opacity: 0.5, filter: 'blur(4px)', flex: 1 }}>
            {comment.content}
          </Typography>
          <Button
            size='small'
            startIcon={<VisibilityIcon />}
            onClick={() => setSpoilerVisible(true)}
            sx={{ color: '#E57373', fontSize: '0.7rem', whiteSpace: 'nowrap' }}
          >
            스포 보기
          </Button>
        </Box>
      ) : (
        <Typography variant='body2' sx={{ color: '#F7F7F7', lineHeight: 1.6, mb: 1 }}>
          {comment.content}
        </Typography>
      )}

      {/* 이모지 반응 + 좋아요 + 대댓글 버튼 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
        {/* 이모지 */}
        {EMOJI_OPTIONS.map((emoji) => (
          <Box
            key={emoji}
            onClick={() => setSelectedEmoji(selectedEmoji === emoji ? null : emoji)}
            sx={{
              fontSize: '1rem',
              cursor: 'pointer',
              opacity: selectedEmoji === emoji ? 1 : 0.4,
              transition: 'opacity 0.2s, transform 0.2s',
              '&:hover': { opacity: 1, transform: 'scale(1.2)' },
            }}
          >
            {emoji}
          </Box>
        ))}

        <Box sx={{ flex: 1 }} />

        {/* 좋아요 */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size='small' onClick={() => setLiked(!liked)} sx={{ p: 0.3 }}>
            {liked
              ? <FavoriteIcon sx={{ color: '#E57373', fontSize: 14 }} />
              : <FavoriteBorderIcon sx={{ color: '#B8C6DB', fontSize: 14 }} />
            }
          </IconButton>
          <Typography variant='caption' sx={{ color: '#B8C6DB', fontSize: '0.7rem' }}>{likeCount}</Typography>
        </Box>

        {/* 대댓글 버튼 (대댓글에는 표시 안 함) */}
        {!isReply && (
          <Button
            size='small'
            startIcon={<ReplyIcon sx={{ fontSize: 14 }} />}
            onClick={() => setShowReplyInput(!showReplyInput)}
            sx={{ color: '#B8C6DB', fontSize: '0.7rem', minWidth: 0, p: '2px 6px' }}
          >
            답글
          </Button>
        )}
      </Box>

      {/* 대댓글 입력창 */}
      {showReplyInput && (
        <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size='small'
            placeholder='답글을 입력하세요...'
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit()}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#142850',
                color: '#F7F7F7',
                fontSize: '0.85rem',
                '& fieldset': { borderColor: '#27496D' },
                '&.Mui-focused fieldset': { borderColor: '#B8C6DB' },
              },
              '& .MuiInputBase-input::placeholder': { color: '#B8C6DB', opacity: 0.5 },
            }}
          />
          <Button
            variant='contained'
            size='small'
            onClick={handleReplySubmit}
            sx={{ backgroundColor: '#27496D', color: '#B8C6DB', '&:hover': { backgroundColor: '#3A6080' }, whiteSpace: 'nowrap' }}
          >
            등록
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CommentItem;
