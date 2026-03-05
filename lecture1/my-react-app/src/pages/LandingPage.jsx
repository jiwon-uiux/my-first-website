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
  const touchStartY = useRef(null);

  useEffect(() => {
    const goToProfile = () => {
      if (isCooling.current) return;
      isCooling.current = true;
      navigate('/profile');
    };

    const handleWheel = (e) => {
      if (e.deltaY > 0) goToProfile();
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (deltaY > 30) goToProfile();
      touchStartY.current = null;
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  return (
    <ParallaxBackground>
      <HeroSection />
      <ScrollIndicator to='/profile' />
    </ParallaxBackground>
  );
}

export default LandingPage;
