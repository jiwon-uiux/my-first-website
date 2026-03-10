import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ParallaxBackground from '../components/landing/ParallaxBackground';
import HeroSection from '../components/landing/HeroSection';
import ScrollIndicator from '../components/common/ScrollIndicator';

/**
 * LandingPage
 * 1페이지: Full Screen Hero + 패럴럭스 배경 + 스크롤 유도 아이콘
 * 아래 스크롤 시 2페이지(/profile)로 이동
 */
function LandingPage() {
  const navigate = useNavigate();
  const touchStartY = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        navigate('/profile');
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (deltaY > 30) {
        navigate('/profile');
      }
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
      <ScrollIndicator />
    </ParallaxBackground>
  );
}

export default LandingPage;
