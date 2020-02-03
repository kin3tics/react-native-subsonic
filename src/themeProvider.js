import React, { useContext, useState, useEffect } from 'react';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import themes from './styles/themes';

const STORAGE_KEY = 'theme';
const ThemeContext = React.createContext();

export const ThemeContextProvider = ({ children }) => {
  const [themeID, setThemeID] = useState();

  useEffect(() => {
    (async () => {
      const storedThemeID = await storage.getItem(STORAGE_KEY);
      if (storedThemeID) setThemeID(storedThemeID);
      else setThemeID(Object.keys(themes)[1]);
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeID, setThemeID }}>
      {!!themeID ? children : null}
    </ThemeContext.Provider>
  );
};
  
export function withTheme(Component) {
  return props => {
    const { themeID, setThemeID } = useContext(ThemeContext);

    const getTheme = themeID => themes[themeID];
    const setTheme = themeID => {
      storage.setItem(STORAGE_KEY, themeID);
      setThemeID(themeID);
    };

    return (
      <Component
        {...props}
        themes={themes}
        theme={getTheme(themeID)}
        setTheme={setTheme}
      />
    );
  };
}