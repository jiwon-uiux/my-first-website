import { Badge, Box, IconButton, Stack, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Section11Badge() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>11. Badge</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        아이콘에 숫자/상태 표시
      </Typography>
      <Stack direction="row" spacing={4}>
        <Badge badgeContent={4} color="primary">
          <IconButton><MailIcon /></IconButton>
        </Badge>
        <Badge badgeContent={99} color="error">
          <IconButton><NotificationsIcon /></IconButton>
        </Badge>
        <Badge badgeContent={0} color="secondary" showZero>
          <IconButton><ShoppingCartIcon /></IconButton>
        </Badge>
        <Badge variant="dot" color="success">
          <IconButton><MailIcon /></IconButton>
        </Badge>
      </Stack>
    </Box>
  );
}

export default Section11Badge;
