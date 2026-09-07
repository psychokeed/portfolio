import { NavLink } from 'react-router-dom';
import { files } from '../data/content';
import FileIcon from './FileIcon';

/*
  BEFORE (scroll version): Sidebar needed `activeFile` and `onSelect`
  props because IT didn't know what was active — App.tsx tracked that
  in state and told it.

  NOW: NavLink already knows the current URL (it reads it from the
  router context every component sits inside). We just tell it which
  path this link points to, and it applies the `active` class itself
  when that path matches window.location. No props for "which one is
  active" needed anymore — the URL *is* the single source of truth.
*/
interface SidebarProps {
  isOpen: boolean;
  onNavigate: () => void; // still needed: closing the mobile sidebar after a click
}

export default function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  return (
    <div className={`sidebar${isOpen ? ' open' : ''}`}>
      <div className="sidebar-title">EXPLORER</div>
      <div className="tree-root">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 4l3 3H20v11H4V4z" />
        </svg>
        PORTFOLIO
      </div>

      {files.map((file) => (
        <NavLink
          key={file.id}
          to={file.path}
          end={file.path === '/'}
          onClick={onNavigate}
          className={({ isActive }) => `file-item${isActive ? ' active' : ''}`}
        >
          <FileIcon id={file.id} /> {file.label}
        </NavLink>
      ))}

      <div className="sidebar-note">
        Fullstack software engineer building fintech-integrated
        software for the Kenyan market — MERN stack, Python, and scalable
        web solutions.
      </div>
    </div>
  );
}
