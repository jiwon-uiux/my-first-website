import ParallaxBackground from '../components/landing/ParallaxBackground';
import HeroSection from '../components/landing/HeroSection';
import ScrollIndicator from '../components/common/ScrollIndicator';

/**
 * LandingPage
 * 1페이지: Full Screen Hero + 패럴럭스 배경 + 스크롤 유도 아이콘
 */
function LandingPage() {
  return (
    <ParallaxBackground>
      <HeroSection />
      <ScrollIndicator to='/profile' />
    </ParallaxBackground>
  );
}

export default LandingPage;
