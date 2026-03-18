import { Box, Container, Typography } from '@mui/material';

// 섹션 컴포넌트들을 여기에 import해서 추가하세요
// import Section01 from './components/sections/Section01';

function App() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          UI 요소 테스트
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          16개 UI 요소를 순차적으로 추가합니다.
        </Typography>

        {/* 섹션 컴포넌트들이 여기에 추가됩니다 */}
        {/* <Section01 /> */}
      </Container>
    </Box>
  );
}

export default App;
