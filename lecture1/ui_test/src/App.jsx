import { Box, Container, Divider, Typography } from '@mui/material';
import Section01Buttons from './components/sections/Section01Buttons';
import Section02Input from './components/sections/Section02Input';
import Section03Dropdown from './components/sections/Section03Dropdown';

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

        <Section01Buttons />
        <Divider sx={{ mb: 6 }} />
        <Section02Input />
        <Divider sx={{ mb: 6 }} />
        <Section03Dropdown />
      </Container>
    </Box>
  );
}

export default App;
