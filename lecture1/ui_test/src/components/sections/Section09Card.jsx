import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';

const CARDS = [
  { title: 'React', desc: 'UI 구성을 위한 JavaScript 라이브러리', color: '#61DAFB' },
  { title: 'MUI', desc: 'React용 Material Design 컴포넌트 라이브러리', color: '#007FFF' },
  { title: 'Vite', desc: '빠른 프론트엔드 빌드 도구', color: '#646CFF' },
];

function Section09Card() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>09. Card</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        타이틀 / 설명 / 액션 버튼
      </Typography>
      <Grid container spacing={2}>
        {CARDS.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 4 }}>
            <Card variant="outlined">
              <Box sx={{ height: 6, bgcolor: card.color }} />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>{card.title}</Typography>
                <Typography variant="body2" color="text.secondary">{card.desc}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">자세히 보기</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Section09Card;
