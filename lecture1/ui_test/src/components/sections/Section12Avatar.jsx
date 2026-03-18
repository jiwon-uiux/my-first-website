import { Avatar, AvatarGroup, Box, Stack, Tooltip, Typography } from '@mui/material';

function Section12Avatar() {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3'];
  const names = ['김지원', '이민준', '박서연', '최현우', '정다은'];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>12. Avatar</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        이니셜 / 이미지 / 그룹
      </Typography>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" sx={{ width: 60 }}>이니셜</Typography>
          {names.slice(0, 3).map((name, i) => (
            <Tooltip key={name} title={name}>
              <Avatar sx={{ bgcolor: colors[i] }}>{name[0]}</Avatar>
            </Tooltip>
          ))}
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" sx={{ width: 60 }}>크기</Typography>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}>S</Avatar>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>M</Avatar>
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'error.main', fontSize: 20 }}>L</Avatar>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" sx={{ width: 60 }}>그룹</Typography>
          <AvatarGroup max={4}>
            {names.map((name, i) => (
              <Tooltip key={name} title={name}>
                <Avatar sx={{ bgcolor: colors[i] }}>{name[0]}</Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Section12Avatar;
