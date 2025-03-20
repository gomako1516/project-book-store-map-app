import React, { createContext, useState, ReactNode } from 'react';

// 型定義
interface MenuContextType {
  openMenu: boolean;
  handleOpenMenu: () => void;
  openAsideMenu: boolean;
  handleOpenAsideMenu: () => void;
}

// デフォルト値
const defaultValue: MenuContextType = {
  openMenu: false,
  handleOpenMenu: () => {},
  openAsideMenu: false,
  handleOpenAsideMenu: () => {},
};

export const MenuContext = createContext<MenuContextType>(defaultValue);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openAsideMenu, setOpenAsideMenu] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOpenAsideMenu = () => {
    setOpenAsideMenu(!openAsideMenu);
  };

  return (
    <MenuContext.Provider value={{ openMenu, openAsideMenu, handleOpenAsideMenu, handleOpenMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
