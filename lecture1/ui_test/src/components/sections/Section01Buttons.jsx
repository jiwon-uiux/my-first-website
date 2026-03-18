import { Box, Button, Stack, Typography } from '@mui/material';

function Section01Buttons() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        01. Buttons
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        outlined variant / 테마 컬러 적용
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button
          variant="outlined"
          color="primary"
          href="https://jiwon-uiux.github.io/my-first-website/"
          target="_blank"
        >
          랜딩페이지
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          href="https://jiwon-uiux.github.io/my-first-website/react-app/"
          target="_blank"
        >
          React 프로필
        </Button>

        <Button
          variant="outlined"
          color="primary"
          href="https://jiwon-uiux.github.io/my-first-website/community/"
          target="_blank"
        >
          커뮤니티
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          href="https://jiwon-uiux.github.io/my-first-website/react-app/#/login"
          target="_blank"
        >
          로그인
        </Button>
      </Stack>
    </Box>
  );
}

export default Section01Buttons;
