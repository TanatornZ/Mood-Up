import {
  Dispatch,
  SetStateAction,
  createContext,
  FC,
  ReactNode,
  useState,
} from "react";

interface AuthType {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider: FC<any> = ({ children }) => {
  const [user, setUser] = useState<string>("123");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
