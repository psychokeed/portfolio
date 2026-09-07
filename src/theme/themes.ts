export interface Theme {
  id: string;
  name: string;
  author: string;
  // Full palette, not just one accent — this is what makes each theme
  // feel like a different editor, not just a different button color.
  bgApp: string;
  bgSidebar: string;
  bgEditor: string;
  bgEditorAlt: string;
  bgPanel: string;
  border: string;
  textBright: string;
  textPrimary: string;
  textDim: string;
  accent: string;
  accentHover: string;
}

// Real, published color values from well-known VS Code themes — colors
// themselves aren't copyrightable, so naming and approximating these
// popular palettes (the way countless "theme preview" sites already do)
// is fine; no source code from any theme's extension is used here.
export const themes: Theme[] = [
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    author: 'GitHub',
    bgApp: '#0d1117', bgSidebar: '#010409', bgEditor: '#0d1117', bgEditorAlt: '#161b22',
    bgPanel: '#010409', border: '#21262d',
    textBright: '#e6edf3', textPrimary: '#c9d1d9', textDim: '#8b949e',
    accent: '#ee7b68', accentHover: '#f3937f',
  },
  {
    id: 'dracula',
    name: 'Dracula',
    author: 'Dracula Theme',
    bgApp: '#282a36', bgSidebar: '#21222c', bgEditor: '#282a36', bgEditorAlt: '#2d2f3d',
    bgPanel: '#21222c', border: '#44475a',
    textBright: '#f8f8f2', textPrimary: '#e2e2ea', textDim: '#6272a4',
    accent: '#bd93f9', accentHover: '#d0aefc',
  },
  {
    id: 'ayu-dark',
    name: 'Ayu Dark',
    author: 'teabyii',
    bgApp: '#0f1419', bgSidebar: '#0a0e14', bgEditor: '#0f1419', bgEditorAlt: '#151a1e',
    bgPanel: '#0a0e14', border: '#1f2632',
    textBright: '#e6e1cf', textPrimary: '#b3b1ad', textDim: '#5c6773',
    accent: '#e6b450', accentHover: '#f0c775',
  },
  {
    id: 'ayu-mirage',
    name: 'Ayu Mirage',
    author: 'teabyii',
    bgApp: '#1f2430', bgSidebar: '#191e2a', bgEditor: '#1f2430', bgEditorAlt: '#232834',
    bgPanel: '#191e2a', border: '#2a2f3a',
    textBright: '#cbccc6', textPrimary: '#b7bdc8', textDim: '#707a8c',
    accent: '#ffcc66', accentHover: '#ffdb8f',
  },
  {
    id: 'nord',
    name: 'Nord',
    author: 'arcticicestudio',
    bgApp: '#2e3440', bgSidebar: '#272c36', bgEditor: '#2e3440', bgEditorAlt: '#333a48',
    bgPanel: '#272c36', border: '#3b4252',
    textBright: '#eceff4', textPrimary: '#d8dee9', textDim: '#7b88a1',
    accent: '#88c0d0', accentHover: '#a6d3e0',
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    author: 'sarah.drasner',
    bgApp: '#011627', bgSidebar: '#010e1a', bgEditor: '#011627', bgEditorAlt: '#0b2942',
    bgPanel: '#010e1a', border: '#1d3b53',
    textBright: '#d6deeb', textPrimary: '#c5e4fd', textDim: '#637777',
    accent: '#82aaff', accentHover: '#a3c2ff',
  },
];

export const defaultThemeId = themes[0].id;
