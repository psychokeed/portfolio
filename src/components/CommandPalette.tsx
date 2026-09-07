import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { files } from '../data/content';
import {
  HomeIcon, AboutIcon, ProjectsIcon, SkillsIcon, ContactIcon, GithubIcon,
  SettingsIcon, TerminalIcon,
} from './NavIcons';

type IconComponent = (props: { size?: number }) => ReactElement;

interface CommandPaletteProps {
  onClose: () => void;
  onOpenTerminal: () => void;
}

const NAV_ICONS: Record<string, IconComponent> = {
  home: HomeIcon,
  about: AboutIcon,
  projects: ProjectsIcon,
  skills: SkillsIcon,
  contact: ContactIcon,
  github: GithubIcon,
};

// A shortcut "chord" hint shown on the right of each row — purely
// visual, matching the reference site's "G H", "G A" style badges.
const SHORTCUT_HINTS: Record<string, string[]> = {
  home: ['G', 'H'], about: ['G', 'A'], projects: ['G', 'P'],
  skills: ['G', 'S'], contact: ['G', 'C'], github: ['G', 'G'],
};

type Row =
  | { kind: 'nav'; id: string; label: string; icon: IconComponent; section: string; hint?: string[]; run: () => void }
  | { kind: 'terminal'; id: 'terminal'; label: string; section: string; hint: string; run: () => void };

export default function CommandPalette({ onClose, onOpenTerminal }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const rows: Row[] = [
    ...files.map((f): Row => ({
      kind: 'nav',
      id: f.id,
      label: `Go to ${f.id === 'home' ? 'Home' : f.id[0].toUpperCase() + f.id.slice(1)}`,
      icon: NAV_ICONS[f.id] ?? HomeIcon,
      section: 'NAVIGATION',
      hint: SHORTCUT_HINTS[f.id],
      run: () => navigate(f.path),
    })),
    {
      kind: 'nav', id: 'settings', label: 'Go to Settings', icon: SettingsIcon,
      section: 'NAVIGATION', run: () => navigate('/settings'),
    },
    {
      kind: 'terminal', id: 'terminal', label: 'Open Terminal',
      section: 'TERMINAL', hint: 'Ctrl+`', run: onOpenTerminal,
    },
    {
      kind: 'nav', id: 'theme', label: 'Preferences: Change Color Theme', icon: SettingsIcon,
      section: 'PREFERENCES', run: () => navigate('/settings'),
    },
  ];

  const matches = rows.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()));

  function select(index: number) {
    const target = matches[index];
    if (!target) return;
    target.run();
    onClose();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      select(highlighted);
    }
  }

  let lastSection = '';

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="palette-input"
          placeholder="Type a command or search…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlighted(0);
          }}
          onKeyDown={onKeyDown}
        />
        <div className="palette-list">
          {matches.map((row, i) => {
            const showHeader = row.section !== lastSection;
            lastSection = row.section;
            return (
              <div key={row.id}>
                {showHeader && <div className="palette-section-label">{row.section}</div>}
                <div
                  className={`palette-row${i === highlighted ? ' highlighted' : ''}`}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => select(i)}
                >
                  <span className="palette-row-left">
                    {row.kind === 'nav' && <row.icon size={16} />}
                    {row.kind === 'terminal' && <TerminalIcon size={16} />}
                    {row.label}
                  </span>
                  {row.kind === 'nav' && row.hint && (
                    <span className="palette-hint">
                      {row.hint.map((k) => <kbd key={k}>{k}</kbd>)}
                    </span>
                  )}
                  {row.kind === 'terminal' && <span className="palette-hint"><kbd>{row.hint}</kbd></span>}
                  {row.id === 'theme' && <span className="palette-hint">›</span>}
                </div>
              </div>
            );
          })}
          {matches.length === 0 && <div className="palette-empty">No matches</div>}
        </div>
        <div className="palette-footer">
          <span>↑↓ to navigate</span>
          <span>↵ to select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
