import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CommentItem from './CommentItem';

/**
 * CommentList 컴포넌트
 * 댓글 목록 + 입력창, 대댓글 구조 렌더링
 *
 * Props:
 * @param {Array} comments - 댓글 배열 [Required]
 *
 * Example usage:
 * <CommentList comments={post.comments} />
 */
function CommentList({ comments }) {
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState('');

  /** 최상위 댓글만 필터 */
  const rootComments = commentList.filter((c) => !c.parentId);

  /** 특정 댓글의 대댓글 목록 */
  const getReplies = (parentId) => commentList.filter((c) => c.parentId === parentId);

  /** 새 댓글 등록 */
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newItem = {
      commentId: Date.now(),
      author: '나',
      content: newComment.trim(),
      likes: 0,
      isSpoiler: false,
      parentId: null,
      emoji: '💬',
    };
    setCommentList((prev) => [...prev, newItem]);
    setNewComment('');
  };

  /** 대댓글 등록 */
  const handleReply = (parentId, content) => {
    const newReply = {
      commentId: Date.now(),
      author: '나',
      content,
      likes: 0,
      isSpoiler: false,
      parentId,
      emoji: '💬',
    };
    setCommentList((prev) => [...prev, newReply]);
  };

  return (
    <Box sx={{ backgroundColor: '#142850', border: '1px solid #27496D', borderRadius: 3, p: 3 }}>
      <Typography variant='h6' sx={{ color: '#F7F7F7', fontWeight: 600, mb: 2 }}>
        댓글 {commentList.length}개
      </Typography>

      {/* 댓글 입력창 */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          size='small'
          placeholder='댓글을 입력하세요...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#0C1E35',
              color: '#F7F7F7',
              '& fieldset': { borderColor: '#27496D' },
              '&.Mui-focused fieldset': { borderColor: '#B8C6DB' },
            },
            '& .MuiInputBase-input::placeholder': { color: '#B8C6DB', opacity: 0.5 },
          }}
        />
        <Button
          variant='contained'
          onClick={handleAddComment}
          sx={{
            backgroundColor: '#B8C6DB',
            color: '#0C1E35',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            '&:hover': { backgroundColor: '#F7F7F7' },
          }}
        >
          등록
        </Button>
      </Box>

      <Divider sx={{ borderColor: '#27496D', mb: 2 }} />

      {/* 댓글 목록 */}
      {rootComments.length === 0 ? (
        <Typography variant='body2' sx={{ color: '#B8C6DB', opacity: 0.5, textAlign: 'center', py: 3 }}>
          첫 번째 댓글을 남겨보세요 🌙
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {rootComments.map((comment) => (
            <Box key={comment.commentId}>
              {/* 댓글 */}
              <CommentItem comment={comment} onReply={handleReply} />

              {/* 대댓글 */}
              {getReplies(comment.commentId).length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                  {getReplies(comment.commentId).map((reply) => (
                    <CommentItem key={reply.commentId} comment={reply} isReply />
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CommentList;
