import { Box, Button, Stack, Typography } from '@mui/material';

function Section01Buttons() {
  const handleClick = (label) => {
    alert(`"${label}" 버튼을 클릭했습니다!`);
  };

  const variants = ['contained', 'outlined', 'text'];
  const colors = ['primary', 'secondary', 'error'];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        01. Buttons
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        variant: contained / outlined / text × color: primary / secondary / error
      </Typography>

      <Stack spacing={2}>
        {variants.map((variant) => (
          <Stack key={variant} direction="row" spacing={2} alignItems="center">
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              {variant}
            </Typography>
            {colors.map((color) => (
              <Button
                key={color}
                variant={variant}
                color={color}
                onClick={() => handleClick(`${variant} / ${color}`)}
              >
                {color}
              </Button>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default Section01Buttons;
