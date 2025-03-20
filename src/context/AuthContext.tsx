import { auth } from "@/lib/firebase/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  // userId: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// グローバルに管理したい値（createContextの初期値）
const defaultContextData = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // ログイン・ログアウトの状態を監視
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser); // ログイン・ログアウトの状態を更新
    });

    return () => {
      unsubscribe(); // アンマウント時に監視を解除（メモリリーク防止）
    };
  }, []);

  // グローバルに使いたい変数をvalueにセット
  // <AuthContext.Provider></AuthContext.Provider>で囲まれたコンポーネントで使える
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// グローバルに使いたい変数を使うためのカスタムフック
export function useAuthContext() {
  return useContext(AuthContext);
}
