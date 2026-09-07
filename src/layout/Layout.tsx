import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { files } from '../data/content';
import Sidebar from '../components/Sidebar';
import TabsBar from '../components/TabsBar';
import Terminal from '../components/Terminal';
import VSCodeLogo from '../components/VSCodeLogo';
import CommandPalette from '../components/CommandPalette';
import { FolderIcon, GithubIcon, ProjectsIcon, PencilIcon, ContactIcon, SettingsIcon } from '../components/NavIcons';
import '../App.css';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const activeFile = files.find((f) =>
    f.path === '/' ? location.pathname === '/' : location.pathname.startsWith(f.path)
  );

  // Global keyboard shortcuts: Cmd/Ctrl+K opens the command palette,
  // Ctrl+` opens the terminal, and "G then <letter>" is a real two-key
  // chord (press G, then within a second press H/A/P/S/C for Home/
  // About/Projects/Skills/Contact) — matching the hint badges shown in
  // the command palette, so they're not just decoration.
  useEffect(() => {
    let awaitingChord = false;
    let chordTimeout: ReturnType<typeof setTimeout> | undefined;

    const CHORD_MAP: Record<string, string> = {
      h: '/', a: '/about', p: '/projects', s: '/skills', c: '/contact',
    };

    function resetChord() {
      awaitingChord = false;
      clearTimeout(chordTimeout);
    }

    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
        return;
      }
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setPanelOpen((open) => !open);
        return;
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        return;
      }

      // Don't hijack "g" while the person is typing it into the
      // terminal or the command palette's search box.
      if (isTyping) return;

      if (awaitingChord) {
        const dest = CHORD_MAP[e.key.toLowerCase()];
        if (dest) {
          e.preventDefault();
          navigate(dest);
        }
        resetChord();
        return;
      }

      if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        awaitingChord = true;
        // Give the person a second to press the follow-up key before
        // treating this as a plain "g" keystroke again.
        chordTimeout = setTimeout(resetChord, 1000);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(chordTimeout);
    };
  }, [navigate]);

  return (
    <div className="app">
      <div className="topbar">
        <div className="topbar-left">
          <div className="titlebar-brand">
            <VSCodeLogo size={16} />
          </div>
          <button
            className="sidebar-toggle"
            aria-label="Toggle file explorer"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            ☰
          </button>
          <span>File</span><span>Edit</span>
          <span className="menu-clickable" onClick={() => setPaletteOpen(true)}>View</span>
          <span>Go</span><span>Run</span>
          <span className="menu-clickable" onClick={() => setPanelOpen(true)}>Terminal</span>
          <span>Help</span>
        </div>
        <div className="topbar-title">Brian Nzuki | Visual Studio Code</div>
        <div className="dots">
          <span className="dot amber" /><span className="dot green" /><span className="dot red" />
        </div>
      </div>

      <div className="body-row">
        <div className="activitybar">
          <button
            className={location.pathname === '/' ? 'active' : ''}
            aria-label="Explorer"
            title="Explorer"
            onClick={() => navigate('/')}
          >
            <FolderIcon size={19} />
          </button>
          <button
            className={location.pathname.startsWith('/github') ? 'active' : ''}
            aria-label="GitHub"
            title="GitHub"
            onClick={() => navigate('/github')}
          >
            <GithubIcon size={19} />
          </button>
          <button
            className={location.pathname.startsWith('/projects') ? 'active' : ''}
            aria-label="Projects"
            title="Projects"
            onClick={() => navigate('/projects')}
          >
            <ProjectsIcon size={19} />
          </button>
          <button
            className={location.pathname.startsWith('/about') ? 'active' : ''}
            aria-label="About"
            title="About"
            onClick={() => navigate('/about')}
          >
            <PencilIcon size={19} />
          </button>
          <button
            className={location.pathname.startsWith('/contact') ? 'active' : ''}
            aria-label="Contact"
            title="Contact"
            onClick={() => navigate('/contact')}
          >
            <ContactIcon size={19} />
          </button>
          <div className="activitybar-spacer" />
          <button aria-label="Account" title="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
            </svg>
          </button>
          <button
            className={location.pathname === '/settings' ? 'active' : ''}
            aria-label="Settings"
            title="Settings"
            onClick={() => navigate('/settings')}
          >
            <SettingsIcon size={19} />
          </button>
        </div>

        <Sidebar isOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

        <div className="editor-col">
          <TabsBar />

          <div className="editor">
            <Outlet />
          </div>

          <div className={`panel-wrap${panelOpen ? ' open' : ''}`}>
            <div className="panel-tabs">
              <button className="active">TERMINAL</button>
              <button
                className="panel-close"
                aria-label="Close panel"
                onClick={() => setPanelOpen(false)}
              >
                ✕
              </button>
            </div>
            {panelOpen && <Terminal />}
          </div>
        </div>
      </div>

      <div className="statusbar">
        <span>⎇ main</span>
        <span>⊗ 0 &nbsp; ⚠ 0</span>
        <span className="grow" />
        <span>{activeFile?.label ?? 'settings'}</span>
        <span>UTF-8</span>
        <span>Powered by React + Vite</span>
        <span>Prettier</span>
      </div>

      <button
        className="panel-toggle-btn"
        aria-label="Open terminal"
        onClick={() => setPanelOpen((open) => !open)}
      >
        <span aria-hidden="true">&gt;_</span> Terminal
      </button>

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onOpenTerminal={() => setPanelOpen(true)}
        />
      )}
    </div>
  );
}
