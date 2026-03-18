import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ITEMS = [
  { q: 'MUI란 무엇인가요?', a: 'Material UI의 약자로, Google의 Material Design을 기반으로 한 React UI 컴포넌트 라이브러리입니다.' },
  { q: 'React Hooks는 무엇인가요?', a: 'React 16.8에서 도입된 기능으로, 클래스 없이 상태와 생명주기 기능을 사용할 수 있게 해주는 함수입니다.' },
  { q: 'Vite를 사용하는 이유는?', a: '기존 Webpack 대비 빠른 개발 서버 시작과 HMR(Hot Module Replacement)을 제공하여 개발 경험을 향상시킵니다.' },
];

function Section14Accordion() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>14. Accordion</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        FAQ 형태의 접고 펼치기
      </Typography>
      <Box maxWidth={600}>
        {ITEMS.map((item, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

export default Section14Accordion;
