import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { themes, defaultThemeId, type Theme } from './themes';

/*
  WHY CONTEXT, NOT PROPS
  -------------------------
  The theme needs to be read by the titlebar (a theme button), the
  command palette (a theme picker list), and potentially the terminal
  ("theme <name>" command) — three components that don't sit in a
  parent → child line with each other. Passing themeId/setThemeId down
  as props would mean threading them through Layout, then into every
  child that might need them, whether or not that child cares. Context
  solves exactly this: one Provider up near the root makes the value
  available to ANY descendant that asks for it via useTheme(), no
  matter how deep, with no props passed through the components in
  between that don't use it themselves.
*/

interface ThemeContextValue {
  themeId: string;
  theme: Theme;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'portfolio-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(() => {
    // Lazy initializer: this function only runs once, on the very
    // first render, instead of on every re-render — important here
    // since reading localStorage is a small but real cost.
    return localStorage.getItem(STORAGE_KEY) ?? defaultThemeId;
  });

  const theme = themes.find((t) => t.id === themeId) ?? themes[0];

  // Whenever the theme changes, push every one of its colors onto the
  // real DOM as CSS custom properties. Every rule in App.css that says
  // `var(--accent)`, `var(--bg-app)`, etc. picks this up automatically —
  // swapping thirteen values here re-themes the entire app without
  // touching a single component's className.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--bg-app', theme.bgApp);
    root.setProperty('--bg-sidebar', theme.bgSidebar);
    root.setProperty('--bg-editor', theme.bgEditor);
    root.setProperty('--bg-editor-alt', theme.bgEditorAlt);
    root.setProperty('--bg-panel', theme.bgPanel);
    root.setProperty('--bg-tab-active', theme.bgEditor);
    root.setProperty('--bg-tab-inactive', theme.bgPanel);
    root.setProperty('--border', theme.border);
    root.setProperty('--text-bright', theme.textBright);
    root.setProperty('--text-primary', theme.textPrimary);
    root.setProperty('--text-dim', theme.textDim);
    root.setProperty('--accent', theme.accent);
    root.setProperty('--accent-hover', theme.accentHover);
    localStorage.setItem(STORAGE_KEY, themeId);
  }, [themeId, theme]);

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

// A small custom hook wrapping useContext — this is the conventional
// pattern for consuming a context, and it lets us throw a clear error
// if someone calls useTheme() outside the Provider, instead of a
// confusing "null is not an object" deep inside some component.
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside a ThemeProvider');
  return ctx;
}
