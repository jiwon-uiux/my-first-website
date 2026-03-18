import { useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Stack, Typography,
} from '@mui/material';

function Section15Dialog() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState('');

  const handleConfirm = () => { setResult('확인'); setOpen(false); };
  const handleCancel = () => { setResult('취소'); setOpen(false); };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>15. Dialog</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        확인/취소 다이얼로그
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" onClick={() => setOpen(true)}>
          다이얼로그 열기
        </Button>
        {result && (
          <Typography variant="body2">
            선택: <strong>{result}</strong>
          </Typography>
        )}
      </Stack>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 작업은 되돌릴 수 없습니다. 계속 진행하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>취소</Button>
          <Button onClick={handleConfirm} color="error" variant="contained">삭제</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Section15Dialog;
