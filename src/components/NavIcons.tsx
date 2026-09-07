interface IconProps {
  size?: number;
}

const common = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function HomeIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

export function AboutIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function ProjectsIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <path d="M9 8l-5 4 5 4" />
      <path d="M15 8l5 4-5 4" />
    </svg>
  );
}

export function SkillsIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function ContactIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function GithubIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 18v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M12 14V8" />
      <path d="M9.5 8h5" />
    </svg>
  );
}

export function SettingsIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

export function TerminalIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3" />
      <path d="M12 15h5" />
    </svg>
  );
}

export function PencilIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function FolderIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} {...common}>
      <path d="M4 4h6l2 2h8v12H4z" />
    </svg>
  );
}
