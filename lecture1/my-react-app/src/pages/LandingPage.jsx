import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ParallaxBackground from '../components/landing/ParallaxBackground';
import HeroSection from '../components/landing/HeroSection';
import ScrollIndicator from '../components/common/ScrollIndicator';

/**
 * LandingPage
 * 1페이지: Full Screen Hero + 패럴럭스 배경 + 스크롤 유도 아이콘
 */
function LandingPage() {
  const navigate = useNavigate();
  const isCooling = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0 && !isCooling.current) {
        isCooling.current = true;
        navigate('/profile');
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  return (
    <ParallaxBackground>
      <HeroSection />
      <ScrollIndicator to='/profile' />
    </ParallaxBackground>
  );
}

export default LandingPage;
