import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddReactionIcon from '@mui/icons-material/AddReaction';

/** 이모지 반응 옵션 */
const EMOJI_OPTIONS = ['😂', '😍', '😱', '🔥', '👍', '😭', '🎬', '💯'];

/**
 * CommentItem 컴포넌트
 * 댓글/대댓글 단위 컴포넌트 (좋아요, 이모지 반응 팝오버, 대댓글 입력, 스포일러 토글)
 *
 * Props:
 * @param {object} comment - 댓글 데이터 [Required]
 * @param {boolean} isReply - 대댓글 여부 [Optional, 기본값: false]
 * @param {function} onReply - 대댓글 작성 시 실행 함수 (parentId, content) => void [Optional]
 * @param {function} onAuthorClick - 닉네임 클릭 시 실행 함수 (author: string) => void [Optional]
 *
 * Example usage:
 * <CommentItem comment={commentData} onReply={handleReply} onAuthorClick={(author) => setSelectedAuthor(author)} />
 */
function CommentItem({ comment, isReply = false, onReply, onAuthorClick }) {
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [spoilerVisible, setSpoilerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [emojiAnchor, setEmojiAnchor] = useState(null);

  const likeCount = (comment.likes || 0) + (liked ? 1 : 0);

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onReply?.(comment.commentId, replyText.trim());
    setReplyText('');
    setShowReplyInput(false);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(selectedEmoji === emoji ? null : emoji);
    setEmojiAnchor(null);
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
      {/* 작성자 */}
      <Typography variant='caption' sx={{ color: '#B8C6DB', fontWeight: 600 }}>
        {comment.emoji && <span style={{ marginRight: 4 }}>{comment.emoji}</span>}
        <Box
          component='span'
          onClick={() => onAuthorClick?.(comment.author)}
          sx={{ cursor: 'pointer', '&:hover': { color: '#F7F7F7', textDecoration: 'underline' } }}
        >
          {comment.author}
        </Box>
      </Typography>

      {/* 댓글 내용 (스포일러 처리) */}
      {comment.isSpoiler && !spoilerVisible ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
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
        <Typography variant='body2' sx={{ color: '#F7F7F7', lineHeight: 1.6, mt: 0.5, mb: 1 }}>
          {comment.content}
        </Typography>
      )}

      {/* 액션 바: 이모지 버튼 + 선택된 이모지 + 좋아요 + 답글 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>

        {/* 이모지 반응 버튼 */}
        <IconButton
          size='small'
          onClick={(e) => setEmojiAnchor(e.currentTarget)}
          sx={{
            p: 0.3,
            color: selectedEmoji ? '#F7F7F7' : '#B8C6DB',
            backgroundColor: selectedEmoji ? 'rgba(184,198,219,0.15)' : 'transparent',
            borderRadius: 1,
            '&:hover': { backgroundColor: 'rgba(184,198,219,0.1)' },
          }}
        >
          {selectedEmoji
            ? <Typography sx={{ fontSize: '1rem', lineHeight: 1 }}>{selectedEmoji}</Typography>
            : <AddReactionIcon sx={{ fontSize: 16 }} />
          }
        </IconButton>

        {/* 이모지 팝오버 */}
        <Popover
          open={Boolean(emojiAnchor)}
          anchorEl={emojiAnchor}
          onClose={() => setEmojiAnchor(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          PaperProps={{
            sx: {
              backgroundColor: '#142850',
              border: '1px solid #27496D',
              borderRadius: 2,
              p: 1,
            },
          }}
        >
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {EMOJI_OPTIONS.map((emoji) => (
              <Box
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                sx={{
                  fontSize: '1.3rem',
                  cursor: 'pointer',
                  p: '4px',
                  borderRadius: 1,
                  backgroundColor: selectedEmoji === emoji ? 'rgba(184,198,219,0.2)' : 'transparent',
                  transition: 'transform 0.15s, background-color 0.15s',
                  '&:hover': { transform: 'scale(1.3)', backgroundColor: 'rgba(184,198,219,0.15)' },
                }}
              >
                {emoji}
              </Box>
            ))}
          </Box>
        </Popover>

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

        {/* 답글 버튼 (대댓글에는 표시 안 함) */}
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
