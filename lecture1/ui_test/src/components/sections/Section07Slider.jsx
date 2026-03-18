import { useState } from 'react';
import { Box, Slider, Stack, Typography } from '@mui/material';

function Section07Slider() {
  const [volume, setVolume] = useState(30);
  const [range, setRange] = useState([20, 70]);

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>07. Slider</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        단일 값 / 범위 슬라이더
      </Typography>
      <Stack spacing={4} maxWidth={400}>
        <Box>
          <Typography variant="body2" gutterBottom>볼륨: <strong>{volume}</strong></Typography>
          <Slider value={volume} onChange={(_, v) => setVolume(v)} valueLabelDisplay="auto" />
        </Box>
        <Box>
          <Typography variant="body2" gutterBottom>
            범위: <strong>{range[0]} ~ {range[1]}</strong>
          </Typography>
          <Slider value={range} onChange={(_, v) => setRange(v)} valueLabelDisplay="auto" />
        </Box>
      </Stack>
    </Box>
  );
}

export default Section07Slider;
