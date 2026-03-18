import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

function LoginPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/profile');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                로그인
              </Typography>
              <Typography variant="body1" color="text.secondary">
                이메일과 비밀번호를 입력해주세요.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="이메일"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  autoComplete="email"
                />

                <TextField
                  label="비밀번호"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  로그인
                </Button>

                <Button
                  variant="text"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/')}
                >
                  로그인 없이 계속하기
                </Button>
              </Stack>
            </Box>

            <Divider>
              <Typography variant="body2" color="text.secondary">
                또는 SNS로 로그인
              </Typography>
            </Divider>

            <Stack spacing={1.5}>
              <Button
                type="button"
                variant="contained"
                size="large"
                fullWidth
                onClick={() => navigate('/profile')}
                sx={{
                  backgroundColor: '#FEE500',
                  color: '#191919',
                  '&:hover': { backgroundColor: '#e6cf00' },
                }}
              >
                💬&nbsp;&nbsp;카카오로 로그인
              </Button>

              <Button
                type="button"
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => navigate('/profile')}
                sx={{
                  borderColor: '#dadce0',
                  color: '#3c4043',
                  '&:hover': { backgroundColor: '#f8f9fa', borderColor: '#dadce0' },
                }}
              >
                G&nbsp;&nbsp;Google로 로그인
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
