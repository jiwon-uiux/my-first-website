import { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
];

function Section03Dropdown() {
  const [selected, setSelected] = useState('');

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        03. Dropdown (Select)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        선택된 값 실시간 표시
      </Typography>

      <FormControl sx={{ minWidth: 240 }}>
        <InputLabel>프레임워크 선택</InputLabel>
        <Select
          value={selected}
          label="프레임워크 선택"
          onChange={(e) => setSelected(e.target.value)}
        >
          {OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2, maxWidth: 240 }}>
        <Typography variant="caption" color="text.secondary">선택된 값</Typography>
        <Typography variant="body1" fontWeight={600}>
          {selected ? OPTIONS.find((o) => o.value === selected)?.label : '(선택 없음)'}
        </Typography>
      </Box>
    </Box>
  );
}

export default Section03Dropdown;
