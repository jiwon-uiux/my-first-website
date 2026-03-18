import { useState } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

function Section10Chip() {
  const [tags, setTags] = useState(['React', 'MUI', 'JavaScript', 'CSS', 'HTML']);

  const handleDelete = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>10. Chip</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        클릭 가능 / 삭제 가능
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => handleDelete(tag)} color="primary" variant="outlined" />
        ))}
        {tags.length === 0 && (
          <Typography variant="body2" color="text.secondary">모든 태그가 삭제됐습니다.</Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="아이콘 칩" icon={<FaceIcon />} color="secondary" />
        <Chip label="클릭 칩" onClick={() => alert('칩 클릭!')} clickable />
        <Chip label="비활성화" disabled />
      </Stack>
    </Box>
  );
}

export default Section10Chip;
