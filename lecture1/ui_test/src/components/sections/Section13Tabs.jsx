import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

const TABS = [
  { label: '홈', content: '홈 탭 콘텐츠입니다. 메인 정보를 보여줍니다.' },
  { label: '프로필', content: '프로필 탭 콘텐츠입니다. 사용자 정보를 표시합니다.' },
  { label: '설정', content: '설정 탭 콘텐츠입니다. 앱 설정을 변경할 수 있습니다.' },
];

function Section13Tabs() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>13. Tabs</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        탭 전환으로 콘텐츠 변경
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {TABS.map((t) => <Tab key={t.label} label={t.label} />)}
        </Tabs>
      </Box>
      <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: '0 0 8px 8px' }}>
        <Typography variant="body1">{TABS[tab].content}</Typography>
      </Box>
    </Box>
  );
}

export default Section13Tabs;
