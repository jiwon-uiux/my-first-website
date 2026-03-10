import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * NicknameModal 컴포넌트
 * 소셜 로그인 후 닉네임 설정 모달
 *
 * Props:
 * @param {boolean} isOpen - 모달 열림 여부 [Required]
 * @param {function} onConfirm - 닉네임 확정 시 실행 함수 (nickname: string) => void [Required]
 *
 * Example usage:
 * <NicknameModal isOpen={true} onConfirm={(nickname) => saveNickname(nickname)} />
 */
function NicknameModal({ isOpen, onConfirm }) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    const trimmed = nickname.trim();
    if (trimmed.length < 2) {
      setError('닉네임은 2자 이상이어야 합니다.');
      return;
    }
    if (trimmed.length > 12) {
      setError('닉네임은 12자 이하여야 합니다.');
      return;
    }
    onConfirm(trimmed);
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
    if (error) setError('');
  };

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: {
          backgroundColor: '#142850',
          border: '1px solid #27496D',
          borderRadius: 3,
          minWidth: { xs: 300, sm: 400 },
        },
      }}
    >
      <DialogTitle sx={{ color: '#F7F7F7', fontWeight: 700, pb: 1 }}>
        🌙 닉네임 설정
      </DialogTitle>
      <DialogContent>
        <Typography variant='body2' sx={{ color: '#B8C6DB', mb: 2 }}>
          MoonScreen에서 사용할 닉네임을 입력해주세요. (2~12자)
        </Typography>
        <TextField
          fullWidth
          autoFocus
          value={nickname}
          onChange={handleChange}
          placeholder='예: 달빛영화팬'
          error={!!error}
          helperText={error}
          onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#0C1E35',
              color: '#F7F7F7',
              '& fieldset': { borderColor: '#27496D' },
              '&:hover fieldset': { borderColor: '#B8C6DB' },
              '&.Mui-focused fieldset': { borderColor: '#B8C6DB' },
            },
            '& .MuiInputBase-input::placeholder': { color: '#B8C6DB', opacity: 0.5 },
            '& .MuiFormHelperText-root': { color: '#E57373' },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            onClick={handleConfirm}
            disabled={!nickname.trim()}
            sx={{
              backgroundColor: '#B8C6DB',
              color: '#0C1E35',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#F7F7F7' },
              '&:disabled': { backgroundColor: '#27496D', color: '#B8C6DB' },
            }}
          >
            시작하기
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default NicknameModal;
