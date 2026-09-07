import { NavLink } from 'react-router-dom';
import { files } from '../data/content';
import FileIcon from './FileIcon';

export default function TabsBar() {
  return (
    <div className="tabsbar">
      {files.map((file) => (
        <NavLink
          key={file.id}
          to={file.path}
          end={file.path === '/'}
          className={({ isActive }) => `tab${isActive ? ' active' : ''}`}
        >
          <FileIcon id={file.id} />
          {file.label}
        </NavLink>
      ))}
    </div>
  );
}
