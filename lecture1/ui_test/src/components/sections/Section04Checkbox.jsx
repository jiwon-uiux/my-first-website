import { useState } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';

const ITEMS = ['React', 'Vue', 'Angular', 'Svelte'];

function Section04Checkbox() {
  const [checked, setChecked] = useState({});

  const handleChange = (item) => (e) => {
    setChecked((prev) => ({ ...prev, [item]: e.target.checked }));
  };

  const selected = ITEMS.filter((i) => checked[i]);

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>04. Checkbox</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        다중 선택 가능
      </Typography>
      <FormGroup row>
        {ITEMS.map((item) => (
          <FormControlLabel
            key={item}
            control={<Checkbox checked={!!checked[item]} onChange={handleChange(item)} />}
            label={item}
          />
        ))}
      </FormGroup>
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
        <Typography variant="body2">
          선택됨: <strong>{selected.length ? selected.join(', ') : '(없음)'}</strong>
        </Typography>
      </Box>
    </Box>
  );
}

export default Section04Checkbox;
