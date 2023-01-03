import { createContext, FC, useState } from "react";

export interface MenuSlide {
  isOpen: boolean;
  openMenu?: () => void;
  closeMenu?: () => void;
}

export const MenuSlideContext = createContext<MenuSlide>({ isOpen: false });

export const MenuSlideProvider: FC<any> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <MenuSlideContext.Provider value={{ isOpen, openMenu, closeMenu }}>
      {children}
    </MenuSlideContext.Provider>
  );
};
