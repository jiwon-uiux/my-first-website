import Box from '@mui/material/Box';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Box
      sx={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
      }}
    >
      <Box id='landing' sx={{ scrollSnapAlign: 'start', height: '100vh' }}>
        <LandingPage />
      </Box>
      <Box id='profile' sx={{ scrollSnapAlign: 'start', height: '100vh' }}>
        <ProfilePage />
      </Box>
    </Box>
  );
}

export default App;
