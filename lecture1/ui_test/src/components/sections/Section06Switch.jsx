import { useState } from 'react';
import { Box, FormControlLabel, Stack, Switch, Typography } from '@mui/material';

function Section06Switch() {
  const [states, setStates] = useState({ 다크모드: false, 알림: true, 자동저장: false });

  const handleChange = (key) => (e) => {
    setStates((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>06. Switch</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        ON/OFF 토글
      </Typography>
      <Stack spacing={1}>
        {Object.entries(states).map(([key, val]) => (
          <FormControlLabel
            key={key}
            control={<Switch checked={val} onChange={handleChange(key)} />}
            label={`${key}: ${val ? 'ON' : 'OFF'}`}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Section06Switch;
