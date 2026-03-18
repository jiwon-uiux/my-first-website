import { Box, Container, Divider, Typography } from '@mui/material';
import Section01Buttons from './components/sections/Section01Buttons';
import Section02Input from './components/sections/Section02Input';
import Section03Dropdown from './components/sections/Section03Dropdown';
import Section04Checkbox from './components/sections/Section04Checkbox';
import Section05Radio from './components/sections/Section05Radio';
import Section06Switch from './components/sections/Section06Switch';
import Section07Slider from './components/sections/Section07Slider';
import Section08Alert from './components/sections/Section08Alert';
import Section09Card from './components/sections/Section09Card';
import Section10Chip from './components/sections/Section10Chip';
import Section11Badge from './components/sections/Section11Badge';
import Section12Avatar from './components/sections/Section12Avatar';
import Section13Tabs from './components/sections/Section13Tabs';
import Section14Accordion from './components/sections/Section14Accordion';
import Section15Dialog from './components/sections/Section15Dialog';
import Section16Table from './components/sections/Section16Table';

const SECTIONS = [
  Section01Buttons, Section02Input, Section03Dropdown, Section04Checkbox,
  Section05Radio, Section06Switch, Section07Slider, Section08Alert,
  Section09Card, Section10Chip, Section11Badge, Section12Avatar,
  Section13Tabs, Section14Accordion, Section15Dialog, Section16Table,
];

function App() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          UI 요소 테스트
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          16개 MUI UI 요소 모음
        </Typography>

        {SECTIONS.map((Section, i) => (
          <Box key={i}>
            <Section />
            {i < SECTIONS.length - 1 && <Divider sx={{ mb: 6 }} />}
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export default App;
