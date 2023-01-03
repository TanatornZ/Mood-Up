import {
  Dispatch,
  SetStateAction,
  createContext,
  FC,
  ReactNode,
  useState,
} from "react";

export interface AuthType {
  user: string;
  changeUser?: (id: string) => void;
}

export const AuthContext = createContext<AuthType>({ user: "" });

export const AuthProvider: FC<any> = ({ children }) => {
  const [user, setUser] = useState<string>("");

  const changeUser = (id: string) => {
    setUser(id);
  };

  return (
    <AuthContext.Provider value={{ user, changeUser }}>
      {children}
    </AuthContext.Provider>
  );
};
