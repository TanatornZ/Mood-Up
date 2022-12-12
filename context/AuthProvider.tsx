import {
    Dispatch,
    SetStateAction,
    createContext,
    FC,
    ReactNode,
    useState,
  } from "react";
  
  export interface MenuSlide {
    user: string;
    changeUser?: () => void
  }
  
  export const AuthContext = createContext<MenuSlide>({ user: '' });
  
  export const AuthProvider: FC<any> = ({ children }) => {
    const [user, Setuser] = useState<string>('');
  
    const changeUser = () => {
        Setuser('user2')
    }
  
    return (
      <AuthContext.Provider value={{ user , changeUser  }}>
        {children}
      </AuthContext.Provider>
    );
  };
  