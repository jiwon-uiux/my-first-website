import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography,
} from '@mui/material';

const ROWS = [
  { name: '김지원', role: '웹퍼블리셔', stack: 'React, MUI', level: '주니어' },
  { name: '이민준', role: '프론트엔드', stack: 'Vue, Tailwind', level: '미드레벨' },
  { name: '박서연', role: '풀스택', stack: 'Next.js, Node', level: '시니어' },
  { name: '최현우', role: 'UI/UX', stack: 'Figma, React', level: '주니어' },
  { name: '정다은', role: '백엔드', stack: 'Spring, Java', level: '미드레벨' },
];

function Section16Table() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>16. Table</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        데이터 목록 표시
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 640 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              {['이름', '역할', '기술 스택', '레벨'].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ROWS.map((row) => (
              <TableRow key={row.name} hover>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.stack}</TableCell>
                <TableCell>{row.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Section16Table;
