import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal 커스텀 훅
 * IntersectionObserver를 사용하여 요소가 뷰포트에 진입하면 visible 상태를 true로 변경
 *
 * @param {object} options - IntersectionObserver 옵션 [Optional]
 * @returns {{ ref, isVisible }} - ref와 isVisible 상태
 */
function useScrollReveal(options = { threshold: 0.1 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default useScrollReveal;
