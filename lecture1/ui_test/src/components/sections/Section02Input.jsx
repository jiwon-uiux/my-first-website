import { useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';

function Section02Input() {
  const [values, setValues] = useState({ standard: '', outlined: '', filled: '' });

  const handleChange = (variant) => (e) => {
    setValues((prev) => ({ ...prev, [variant]: e.target.value }));
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        02. Input (TextField)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        variant: standard / outlined / filled — 입력값 실시간 표시
      </Typography>

      <Stack spacing={3} maxWidth={400}>
        <TextField
          variant="standard"
          label="Standard"
          placeholder="텍스트를 입력하세요"
          value={values.standard}
          onChange={handleChange('standard')}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Outlined"
          placeholder="텍스트를 입력하세요"
          value={values.outlined}
          onChange={handleChange('outlined')}
          fullWidth
        />
        <TextField
          variant="filled"
          label="Filled"
          placeholder="텍스트를 입력하세요"
          value={values.filled}
          onChange={handleChange('filled')}
          fullWidth
        />

        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary">입력값 실시간 표시</Typography>
          {['standard', 'outlined', 'filled'].map((v) => (
            <Typography key={v} variant="body2">
              <strong>{v}:</strong> {values[v] || '(없음)'}
            </Typography>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

export default Section02Input;
