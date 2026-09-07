import { themes } from '../../theme/themes';
import { useTheme } from '../../theme/ThemeContext';

// Small text/emoji badges standing in for each theme's real marketplace
// icon — generic and safe to use, while still giving each card its own
// visual identity at a glance.
const BADGES: Record<string, string> = {
  'github-dark': '⌥',
  dracula: '🧛',
  'ayu-dark': 'ayu',
  'ayu-mirage': 'ayu',
  nord: '❄',
  'night-owl': '🦉',
};

export default function Settings() {
  const { themeId, theme, setThemeId } = useTheme();

  return (
    <section className="page-center wide" id="settings">
      <div className="settings-header">
        <div className="settings-icon" style={{ color: theme.accent, borderColor: theme.accent }}>
          ◐
        </div>
        <div>
          <h1 className="left" style={{ marginBottom: 4 }}>Settings</h1>
          <p className="lede left" style={{ margin: 0 }}>
            Customize your editor appearance. Choose from curated themes that match your style.
          </p>
        </div>
      </div>

      <div className="hr" style={{ margin: '28px 0' }} />

      <h2 className="gh-section-title">COLOR THEME</h2>
      <div className="theme-grid">
        {themes.map((t) => {
          const selected = t.id === themeId;
          return (
            <button
              key={t.id}
              className={`theme-card${selected ? ' selected' : ''}`}
              style={selected ? { borderColor: t.accent } : undefined}
              onClick={() => setThemeId(t.id)}
            >
              <div className="theme-card-icon" style={{ background: t.bgEditorAlt, color: t.accent }}>
                {BADGES[t.id] ?? '◐'}
                {selected && (
                  <span className="theme-card-check" style={{ background: t.accent }}>✓</span>
                )}
              </div>
              <div>
                <div className="theme-card-name">{t.name}</div>
                <div className="theme-card-author">{t.author}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
