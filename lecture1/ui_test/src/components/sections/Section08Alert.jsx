import { Alert, Box, Stack, Typography } from '@mui/material';

function Section08Alert() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>08. Alert</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        severity: success / info / warning / error
      </Typography>
      <Stack spacing={2} maxWidth={500}>
        <Alert severity="success">저장이 완료됐습니다.</Alert>
        <Alert severity="info">새로운 업데이트가 있습니다.</Alert>
        <Alert severity="warning">세션이 곧 만료됩니다.</Alert>
        <Alert severity="error">오류가 발생했습니다. 다시 시도해주세요.</Alert>
      </Stack>
    </Box>
  );
}

export default Section08Alert;
