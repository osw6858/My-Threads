import { create } from 'zustand';

interface UserInfo {
  email: string;
  uid: string;
  userName: string;
}

interface Auth {
  isAuth: boolean;
  setIsAuth: () => void;
  userInfo: UserInfo;
  setUserInfo: (email: string, uid: string) => void;
}

const isWindowMount = typeof window !== 'undefined';
const authData =
  isWindowMount && localStorage.getItem('sb-ohpldinktpofyatjafei-auth-token');
const parseAuthData = authData && JSON.parse(authData);

export const useAuthStore = create<Auth>()((set) => ({
  isAuth: !!authData,
  userInfo: {
    uid: parseAuthData?.user?.id,
    email: parseAuthData?.user?.email,
    userName: parseAuthData?.user?.user_metadata?.user_name,
  },

  setIsAuth: () => set((state) => ({ isAuth: !state.isAuth })),
  setUserInfo: (email: string, uid: string) =>
    set((state) => ({
      userInfo: { ...state.userInfo, email: email, uid: uid },
    })),
}));
