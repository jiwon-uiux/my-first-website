import { useState } from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';

function Section05Radio() {
  const [value, setValue] = useState('');

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>05. Radio</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        단일 선택
      </Typography>
      <FormControl>
        <FormLabel>선호 언어</FormLabel>
        <RadioGroup row value={value} onChange={(e) => setValue(e.target.value)}>
          {['JavaScript', 'TypeScript', 'Python', 'Go'].map((lang) => (
            <FormControlLabel key={lang} value={lang} control={<Radio />} label={lang} />
          ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
        <Typography variant="body2">
          선택됨: <strong>{value || '(없음)'}</strong>
        </Typography>
      </Box>
    </Box>
  );
}

export default Section05Radio;
