import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { files, contactLinks } from '../data/content';
import { themes } from '../theme/themes';
import { useTheme } from '../theme/ThemeContext';

/*
  This is a REAL command interpreter, not an animation. The core idea:
  keep an array of past "lines" (both what the user typed and what we
  printed back), plus the text currently being typed. On Enter, look up
  the typed word in a table of command handlers and run it.

  Each handler is just a function that returns the lines to print. Some
  handlers (like "home" or "about") call navigate() as a *side effect*
  in addition to returning output — pressing Enter after typing "about"
  actually routes you to /about, same as clicking the sidebar link.
*/

interface Line {
  kind: 'input' | 'output';
  text: string;
}

export default function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: 'output', text: 'Welcome to the interactive terminal!' },
    { kind: 'output', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  // Up-arrow command recall: a separate list of just what was typed,
  // plus a pointer into it. Doesn't affect `history` (the printed log).
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [recallIndex, setRecallIndex] = useState<number | null>(null);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setThemeId } = useTheme();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  function print(...lines: string[]) {
    setHistory((prev) => [...prev, ...lines.map((text) => ({ kind: 'output' as const, text }))]);
  }

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    setHistory((prev) => [...prev, { kind: 'input', text: trimmed }]);
    if (!trimmed) return;

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        print(
          'about     - Go to the about page',
          'projects  - Go to the projects page',
          'skills    - Go to the skills page',
          'contact   - Go to the contact page',
          'github    - Go to the GitHub stats page',
          'home      - Go to the home page',
          'whoami    - Who am I?',
          'ls        - List directory contents',
          'pwd       - Print working directory',
          'date      - Show current date',
          'echo      - Echo text (usage: echo <text>)',
          'theme     - Change color theme (usage: theme <name>, e.g. theme dracula)',
          'settings  - Go to the settings page',
          'clear     - Clear terminal',
        );
        break;
      case 'about':
      case 'projects':
      case 'skills':
      case 'contact':
      case 'home':
      case 'github': {
        const file = files.find((f) => f.id === cmd.toLowerCase());
        if (file) {
          navigate(file.path);
          print(`opening ${file.label}...`);
        }
        break;
      }
      case 'settings':
        navigate('/settings');
        print('opening settings...');
        break;
      case 'whoami':
        print('brian nzuki | fullstack software engineer, Nairobi, Kenya');
        break;
      case 'ls':
        print(files.map((f) => f.label).join('  '));
        break;
      case 'pwd':
        print('/home/brian/portfolio');
        break;
      case 'date':
        print(new Date().toString());
        break;
      case 'echo':
        print(arg || '');
        break;
      case 'theme': {
        if (!arg) {
          print(`available themes: ${themes.map((t) => t.id).join(', ')}`);
          break;
        }
        const match = themes.find((t) => t.id === arg.toLowerCase());
        if (match) {
          setThemeId(match.id);
          print(`theme set to ${match.name}`);
        } else {
          print(`unknown theme "${arg}". available: ${themes.map((t) => t.id).join(', ')}`);
        }
        break;
      }
      case 'clear':
        setHistory([]);
        return;
      case 'sudo':
        print(`Permission granted. Let's talk → ${contactLinks.find((l) => l.label === 'email')?.value}`);
        break;
      default:
        print(`command not found: ${cmd}. Type "help" for available commands.`);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      runCommand(input);
      setPastCommands((prev) => [...prev, input]);
      setRecallIndex(null);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const nextIndex = recallIndex === null ? pastCommands.length - 1 : Math.max(recallIndex - 1, 0);
      setRecallIndex(nextIndex);
      setInput(pastCommands[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (recallIndex === null) return;
      const nextIndex = recallIndex + 1;
      if (nextIndex >= pastCommands.length) {
        setRecallIndex(null);
        setInput('');
      } else {
        setRecallIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      }
    }
  }

  return (
    <div className="panel-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
      {history.map((line, i) =>
        line.kind === 'input' ? (
          <div className="term-line" key={i}>
            <span className="term-prompt">brian@portfolio</span>{' '}
            <span className="term-path">~</span> $ {line.text}
          </div>
        ) : (
          <div className="term-line term-dim" key={i}>{line.text}</div>
        )
      )}
      <div className="term-line term-input-row">
        <span className="term-prompt">brian@portfolio</span>{' '}
        <span className="term-path">~</span> $
        <input
          ref={inputRef}
          className="term-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}
