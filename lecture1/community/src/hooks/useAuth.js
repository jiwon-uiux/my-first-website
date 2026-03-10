import { useState } from 'react';

/**
 * useAuth 커스텀 훅
 * 로그인 상태 및 사용자 정보 관리
 * Phase 2: Mock 데이터 기반 / Supabase 연동 시 교체 예정
 *
 * @returns {object} { user, isLoggedIn, login, logout }
 */
function useAuth() {
  const [user, setUser] = useState(null);

  const isLoggedIn = !!user;

  /** 로그인 처리 (provider: 'kakao' | 'naver' | 'google') */
  const login = (provider, nickname) => {
    setUser({
      userId: 1,
      nickname: nickname || '달빛영화팬',
      profileImageUrl: null,
      bio: '',
      provider,
    });
  };

  /** 로그아웃 처리 */
  const logout = () => {
    setUser(null);
  };

  return { user, isLoggedIn, login, logout };
}

export default useAuth;
