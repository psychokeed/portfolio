import type { FileId } from '../types/portfolio';

// A lookup table from file id -> { background color, short glyph }.
// This is the same "data drives UI" idea as the files array itself:
// add a new file type here and every place that renders a FileIcon
// picks it up automatically.
const GLYPHS: Record<FileId, { bg: string; text: string; glyph: string }> = {
  home: { bg: '#1a3a5c', text: '#7aa2f7', glyph: '⚛' },
  about: { bg: '#4a1f12', text: '#f0714a', glyph: '</>' },
  projects: { bg: '#4a3f0a', text: '#f7df1e', glyph: 'JS' },
  skills: { bg: '#2e2350', text: '#9d7cd8', glyph: '{}' },
  contact: { bg: '#0e2a4a', text: '#2f8fef', glyph: '#' },
  github: { bg: '#12305c', text: '#5aa9f7', glyph: 'M↓' },
};

interface FileIconProps {
  id: FileId;
  size?: number;
}

export default function FileIcon({ id, size = 16 }: FileIconProps) {
  const g = GLYPHS[id];
  return (
    <span
      className="file-badge"
      style={{
        background: g.bg,
        color: g.text,
        width: size,
        height: size,
        fontSize: size * 0.55,
      }}
      aria-hidden="true"
    >
      {g.glyph}
    </span>
  );
}
